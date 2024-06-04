import { useState } from "react";
import { Container, VStack, HStack, Box, Text, IconButton, Progress, Flex, Stepper, Step, StepIndicator, StepStatus, StepTitle, StepDescription, StepSeparator } from "@chakra-ui/react";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

const steps = ["Purchase Requisition Creation", "Purchase Requisition Approval", "Purchase Order Creation", "Goods Receipt", "Invoice Verification", "Payment Processing"];

const StepItem = ({ step, index, currentStep }) => {
  return (
    <Step key={index}>
      <StepIndicator>
        <StepStatus complete={<FaCheckCircle />} incomplete={<FaCircle />} active={<FaCircle />} />
      </StepIndicator>
      <Box flexShrink="0">
        <StepTitle>{step}</StepTitle>
        <StepDescription>{index < currentStep ? "Completed" : index === currentStep ? "In Progress" : "Pending"}</StepDescription>
      </Box>
      <StepSeparator />
    </Step>
  );
};

const ProgressSteps = ({ currentStep }) => {
  return (
    <VStack spacing={4} align="stretch">
      <Stepper index={currentStep} colorScheme="blue" size="lg" orientation="vertical">
        {steps.map((step, index) => (
          <StepItem key={index} step={step} index={index} currentStep={currentStep} />
        ))}
      </Stepper>
    </VStack>
  );
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Container maxW={{ base: "container.sm", md: "container.md" }} height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={{ base: 4, md: 8 }}>
      <Box position="sticky" top={0} width="100%" bg="white" zIndex={1} p={4} boxShadow="md">
        <ProgressSteps currentStep={currentStep} />
      </Box>
      <Flex direction="column" align="center" mt={{ base: 4, md: 8 }}>
        <Text fontSize={{ base: "xl", md: "2xl" }} mb={4}>
          Current Step: {steps[currentStep]}
        </Text>
        <HStack spacing={{ base: 2, md: 4 }}>
          <IconButton aria-label="Previous" icon={<FaCircle />} onClick={handlePrevious} isDisabled={currentStep === 0} />
          <IconButton aria-label="Next" icon={<FaCheckCircle />} onClick={handleNext} isDisabled={currentStep === steps.length - 1} />
        </HStack>
      </Flex>
    </Container>
  );
};

export default Index;
