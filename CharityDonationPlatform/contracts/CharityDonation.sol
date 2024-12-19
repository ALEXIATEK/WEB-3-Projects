// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract CharityDonations {
    address public admin; //The admin of the platform

    uint public charitiesCount; //total number of available charity campaigns

       struct Charity {
        
          uint256 Id;
          string name;
          string description;
          address payable creator;
          uint256 goalAmount;
          uint currentAmount;
          uint256 duration;
          bool isActive;

       }
 
        //Mapping from charity id to charity name
        mapping (uint => Charity) public charities;

        //Mapping from donor address to donotaions
        mapping (address => mapping ( uint => uint)) public donations;

        //Events to log donation actions for each campaign
        event CharityCreated ( uint CharityId, string name, string description, uint256 duration, address creator,  uint goalAmount, uint currentAmount );
        event DonationRecieved ( address donor, uint amount, uint CharityId);
        event WithdrawalMade ( uint CharityId, uint amount, address reciever);

        constructor (address _admin) {
            admin = _admin; // Set the platform admin
        }

        // Only the admin can execute certain actions
         modifier onlyAdmin () {
            require(msg.sender == admin, "Only admin can perform this action.");
            _;
        }

       // Only campaign creators or admin can interact with their campaign
         modifier onlyCharityCreator (uint CharityId) {
           require ( msg.sender == charities[CharityId].creator || msg.sender == admin, "Only the campaign creator or admin can access this campaign.");
        _;
       }

       // Campaign creation
       function createCharity(string memory _name, uint256 _goalAmount, string memory _description, uint256 _duration ) external {
          charitiesCount++;
          charities[charitiesCount] = Charity ({
            Id: charitiesCount,
            name: _name,
            duration: _duration,
            description: _description,
            creator: payable(msg.sender),
            goalAmount: _goalAmount,
            currentAmount: 0,
            isActive: true
        });

     emit CharityCreated(
        charitiesCount, 
          _name, 
          _description, 
          _duration, 
          msg.sender, 
          _goalAmount, 
          0
          );
       }

       //  Donors can donate to a campaign 
       function donateFunds(uint CharityId) external payable {
         require(charities[CharityId].isActive, "Charity not available.");
         require(msg.value > 0, "Donation must be greater than zero");
         require(charities[CharityId].creator != address(0), "Charity does not exist");

         charities[CharityId].currentAmount += msg.value;

         emit DonationRecieved  (msg.sender, msg.value, CharityId);

       }

       // Fund withdrawal
       function withdrawFunds (uint CharityId, uint amount) external onlyCharityCreator(CharityId) {
        require(charities[CharityId].currentAmount >= amount, "Not enough funds");
        require(charities[CharityId].isActive, "Charity is currently unavailable");
        require(charities[CharityId].creator != address(0), "Charity does not exist");

        charities[CharityId].currentAmount -= amount;
        payable(charities[CharityId].creator).transfer(amount);

        emit WithdrawalMade(CharityId, amount, charities[CharityId].creator);
       }

       // Campaign deactivation when goal is attained
       function deactivateCharity (uint CharityId ) external onlyAdmin {
        require(charities[CharityId].isActive, "Charity not available");

        charities[CharityId].isActive = false;
       }

    }