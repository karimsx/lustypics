import * as React from 'react';
import {ReactElement} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {LoadingButton} from "@mui/lab";

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export interface LinearStepperProps {
    isLoading?: boolean
    steps: Array<{
        label: string,
        element: ReactElement,
        optional: boolean,
        onNext: () => any
    }>
    onEnd?: () => void
    onSkip?: () => void
}

export default function LinearStepper({steps, isLoading, onEnd, onSkip}: LinearStepperProps) {
    const [activeStep, setActiveStep] = React.useState(0);


    const handleNext = async () => {
        await steps[activeStep].onNext()

        if (activeStep == steps.length - 1)
            await onEnd?.()
        else
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = async () => {
        await onSkip?.()
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Stepper activeStep={activeStep}>
                {steps.map(({element, label}, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    if (steps[index].optional) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            <Box mt={2}>

                <>
                    {steps[activeStep].element}
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{mr: 1}}
                        >
                            Précédent
                        </Button>
                        <Box sx={{flex: '1 1 auto'}}/>

                        {steps[activeStep].optional && (
                            <Button color="warning" onClick={handleSkip} sx={{mr: 1}}>
                                Ignorer
                            </Button>
                        )}

                        <LoadingButton loading={isLoading} variant={"contained"} onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finaliser' : 'Suivant'}
                        </LoadingButton>
                    </Box>
                </>
            </Box>

        </Box>
    );
}
