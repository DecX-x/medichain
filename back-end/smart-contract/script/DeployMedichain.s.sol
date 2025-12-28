// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/MedichainPatientIdentity.sol";
import "../src/AutomatedHospitalRegistry.sol";

/**
 * @title DeployMedichain
 * @notice Deployment script for Medichain smart contracts on Lisk Sepolia Testnet
 * @dev Run with: forge script script/DeployMedichain.s.sol:DeployMedichain --rpc-url $RPC_URL --broadcast --verify
 */
contract DeployMedichain is Script {
    
    function run() external {
        // Load private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        console.log("==============================================");
        console.log("MEDICHAIN DEPLOYMENT - LISK SEPOLIA TESTNET");
        console.log("==============================================");
        console.log("Deployer address:", deployer);
        console.log("Deployer balance:", deployer.balance);
        console.log("");

        vm.startBroadcast(deployerPrivateKey);

        // =====================================================================
        // 1. Deploy AutomatedHospitalRegistry FIRST
        //    The deployer will be the systemVerifier for signature validation
        // =====================================================================
        console.log("Deploying AutomatedHospitalRegistry...");
        AutomatedHospitalRegistry hospitalRegistry = new AutomatedHospitalRegistry(deployer);
        console.log("AutomatedHospitalRegistry deployed at:", address(hospitalRegistry));

        // =====================================================================
        // 2. Deploy MedichainPatientIdentity with reference to HospitalRegistry
        // =====================================================================
        console.log("Deploying MedichainPatientIdentity...");
        MedichainPatientIdentity patientIdentity = new MedichainPatientIdentity(address(hospitalRegistry));
        console.log("MedichainPatientIdentity deployed at:", address(patientIdentity));

        vm.stopBroadcast();

        // =====================================================================
        // Summary
        // =====================================================================
        console.log("");
        console.log("==============================================");
        console.log("DEPLOYMENT COMPLETE!");
        console.log("==============================================");
        console.log("Network: Lisk Sepolia Testnet (Chain ID: 4202)");
        console.log("");
        console.log("Contract Addresses:");
        console.log("  MedichainPatientIdentity:", address(patientIdentity));
        console.log("  AutomatedHospitalRegistry:", address(hospitalRegistry));
        console.log("");
        console.log("System Verifier (for hospital signatures):", deployer);
        console.log("");
        console.log("Next Steps:");
        console.log("  1. Update backend .env with contract addresses");
        console.log("  2. Whitelist hospitals using whitelistHospital()");
        console.log("  3. Test patient registration flow");
        console.log("==============================================");
    }
}

/**
 * @title DeployPatientIdentityOnly
 * @notice Deploy only the MedichainPatientIdentity contract
 */
contract DeployPatientIdentityOnly is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address hospitalRegistryAddr = vm.envOr("HOSPITAL_REGISTRY_ADDRESS", address(0));
        
        vm.startBroadcast(deployerPrivateKey);
        
        MedichainPatientIdentity patientIdentity = new MedichainPatientIdentity(hospitalRegistryAddr);
        console.log("MedichainPatientIdentity deployed at:", address(patientIdentity));
        console.log("Hospital Registry linked to:", hospitalRegistryAddr);
        
        vm.stopBroadcast();
    }
}

/**
 * @title DeployHospitalRegistryOnly  
 * @notice Deploy only the AutomatedHospitalRegistry contract
 */
contract DeployHospitalRegistryOnly is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        vm.startBroadcast(deployerPrivateKey);
        
        AutomatedHospitalRegistry hospitalRegistry = new AutomatedHospitalRegistry(deployer);
        console.log("AutomatedHospitalRegistry deployed at:", address(hospitalRegistry));
        console.log("System Verifier set to:", deployer);
        
        vm.stopBroadcast();
    }
}
