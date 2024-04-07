// SPDX-License-Identifier: MIT 
pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract FlightData1 {
    
        uint256 a;
        string b;
        uint256 c;


    function setter(uint256 _a,string memory _b,uint256 _c) public {
        
        a=_a;
        b=_b;
        c=_c;
    }

    function getter() public view returns (uint,string memory,uint) {
        return  (a,b,c);
    }
}