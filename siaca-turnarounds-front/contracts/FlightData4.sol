// SPDX-License-Identifier: MIT 
pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract FlightData4 {
    
        string timestamps;
        string planeData;
        string airlineData;
        string lateCodeData;
        string destinationData;
        string departureData;
        
        string taskNamesArray;
        string tasksValuesArray;




    function setter(string memory _timestamps,string memory _planeData,string memory _airlineData,string memory _lateCodeData,string memory _destinationData,string memory _departureData,string memory _taskNamesArray,string memory _tasksValuesArray) public {
        
        timestamps=_timestamps;
        planeData=_planeData;
        airlineData=_airlineData;
        lateCodeData=_lateCodeData;
        destinationData=_destinationData;
        departureData=_departureData;
        taskNamesArray=_taskNamesArray;
        tasksValuesArray=_tasksValuesArray;
        
    }


    function getter() public view returns (string memory,string memory,string memory,string memory,string memory,string memory,string memory,string memory) {
        return (timestamps,planeData,airlineData,lateCodeData,destinationData,departureData,taskNamesArray,tasksValuesArray);
    }

}