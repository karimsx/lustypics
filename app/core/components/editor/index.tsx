import React, {useEffect, useState} from "react"
import {Content, EditorContent, JSONContent, useEditor} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {Box, Divider, IconButton, Menu, MenuItem} from "@mui/material"
import {
  Code,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatStrikethrough,
  Redo,
  TableChart,
  Undo,
} from "@mui/icons-material"
import {CharacterCount} from "@tiptap/extension-character-count"
import TextStyle from "@tiptap/extension-text-style"
import {Color} from "@tiptap/extension-color"
import Placeholder from "@tiptap/extension-placeholder"
import ToggleIconButton from "./ToggleIconButton"
import TitleIcon from "@mui/icons-material/Title"


export interface EditorDataOut {
  contentJson: JSONContent;
  contentText: string;
  contentHtml: string;
}

export interface TiptapProps {
  onChange: (data: EditorDataOut) => void
  value: Content
  error?: boolean
  helperText?: JSX.Element

  [k: string]: any
}

export const Index = ({value, onChange, ...other}: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount,
      TextStyle,
      Color,
      Placeholder.configure({
        showOnlyCurrent: false,
        placeholder: ({node}) => {
          if (node.type.name === "heading") {
            return "Titre de la note"
          }

          return ""
        },
      }),
    ],
    autofocus: "start",
    content: value,
    onUpdate({editor, transaction}) {
      onChange({
        contentJson: editor.getJSON(),
        contentText: editor.getText({
          blockSeparator: '<br />'
        }),
        contentHtml: editor.getHTML(),
      })
    },
  })


  useEffect(() => {
    editor?.chain().setContent(value)
  }, [value, editor])

  return (
    <>
      {editor && (
        <>
          <Box
            sx={{
              overflowY: "auto",
              height: "100%",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <MenuBar editor={editor}/>
            <Divider/>
            <EditorContent style={{height: '100%', flexGrow: 1}} editor={editor}/>
          </Box>

          {/*<BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>*/}
          {/*  <MenuBar editor={editor} />*/}
          {/*</BubbleMenu>*/}
        </>
      )}
    </>
  )
}

const MenuBar = ({editor}: { editor: any }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  if (!editor) {
    return null
  }

  return (
    <>
      <Box display="flex" alignItems="center">
        <ToggleIconButton size={"small"} toggled={editor.isActive("heading")} onClick={handleClick}>
          <TitleIcon/>
        </ToggleIconButton>

        <input
          type="color"
          onChange={(evt) => editor.chain().focus().setColor(evt.target.value).run()}
          value={editor.getAttributes("textStyle").color}
        />

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose()
              editor.chain().focus().toggleHeading({level: 2}).run()
            }}
          >
            <h2>Heading 1</h2>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose()
              editor.chain().focus().toggleHeading({level: 3}).run()
            }}
          >
            <h3>Heading 2</h3>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose()
              editor.chain().focus().toggleHeading({level: 4}).run()
            }}
          >
            <h4>Heading 3</h4>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose()
              editor.chain().focus().toggleHeading({level: 5}).run()
            }}
          >
            <h5>Heading 4</h5>
          </MenuItem>
        </Menu>

        <ToggleIconButton
          toggled={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FormatBold/>
        </ToggleIconButton>
        <ToggleIconButton
          size={"small"}
          toggled={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FormatItalic/>
        </ToggleIconButton>
        <ToggleIconButton
          size={"small"}
          toggled={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <FormatStrikethrough/>
        </ToggleIconButton>

        <ToggleIconButton
          size={"small"}
          toggled={editor.isActive("codeblock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code/>
        </ToggleIconButton>

        <ToggleIconButton
          size={"small"}
          toggled={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <FormatListBulleted></FormatListBulleted>
        </ToggleIconButton>

        <ToggleIconButton
          size={"small"}
          toggled={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <FormatListNumbered></FormatListNumbered>
        </ToggleIconButton>

        <ToggleIconButton
          size={"small"}
          toggled={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <FormatQuote/>
        </ToggleIconButton>

        <ToggleIconButton size={"small"} toggled={editor.isActive("codeBlock")}
                          onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <TableChart/>
        </ToggleIconButton>

        <IconButton onClick={() => editor.chain().focus().undo().run()} size={"small"}>
          <Undo></Undo>
        </IconButton>
        <IconButton onClick={() => editor.chain().focus().redo().run()} size={"small"}>
          <Redo></Redo>
        </IconButton>
      </Box>
    </>
  )
}

export default Index
