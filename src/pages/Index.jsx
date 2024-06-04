import { useState } from "react";
import { Container, VStack, HStack, Box, Text, IconButton, Progress, Flex } from "@chakra-ui/react";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

const steps = ["Purchase Requisition Creation", "Purchase Requisition Approval", "Purchase Order Creation", "Goods Receipt", "Invoice Verification", "Payment Processing"];

const Step = ({ step, isCompleted, isActive }) => {
  return (
    <HStack spacing={4} align="center">
      <IconButton aria-label={step} icon={isCompleted ? <FaCheckCircle /> : <FaCircle />} colorScheme={isCompleted ? "green" : isActive ? "blue" : "gray"} isRound size="lg" />
      <Text fontSize="lg" fontWeight={isActive ? "bold" : "normal"}>
        {step}
      </Text>
    </HStack>
  );
};

const ProgressSteps = ({ currentStep }) => {
  return (
    <VStack spacing={4} align="stretch">
      {steps.map((step, index) => (
        <Step key={index} step={step} isCompleted={index < currentStep} isActive={index === currentStep} />
      ))}
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
    <Container maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box position="sticky" top={0} width="100%" bg="white" zIndex={1} p={4} boxShadow="md">
        <ProgressSteps currentStep={currentStep} />
      </Box>
      <Flex direction="column" align="center" mt={8}>
        <Text fontSize="2xl" mb={4}>
          Current Step: {steps[currentStep]}
        </Text>
        <HStack spacing={4}>
          <IconButton aria-label="Previous" icon={<FaCircle />} onClick={handlePrevious} isDisabled={currentStep === 0} />
          <IconButton aria-label="Next" icon={<FaCheckCircle />} onClick={handleNext} isDisabled={currentStep === steps.length - 1} />
        </HStack>
      </Flex>
    </Container>
  );
};

export default Index;
