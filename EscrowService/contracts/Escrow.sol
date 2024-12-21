// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Escrow {

    uint256 public escrowCount;

     struct escrowDetails {

      uint256 escrowId;
      uint256 sellerId;
      uint256 buyerId;
      uint256 amount;
      address payable escrowAgent;
      status escrowStatus;

     }

    
     enum status {pending, approved}

      // Mapping escrowId to escrowDetails
     mapping ( uint256 escrowId => escrowDetails ) public escrows;

     event fundsDeposited ( uint256 escrowId, uint256 sellerId, uint256 buyerId, uint256 amount, address escrowAgent );
     event fundsReleased ( uint256 amount, address seller,  address escrowAgent );
     event fundsHeld ( uint256 amount, uint256 buyerId, uint256 sellerId, uint256 escrowAgent );

     function DepositFunds ( uint256 _amount, uint256 _buyerId, uint256 _sellerId, address _escrowAgent ) external payable {
        require ( msg.value > 0, " Amount must be greater than 0" );
        require ( msg.value == _amount, "The sent value must match the required amount");

        escrowCount ++;
        escrows[escrowCount] = escrowDetails ({
            escrowId : escrowCount,
            sellerId: _sellerId,
            buyerId: _buyerId,
            amount: msg.value,
            escrowAgent: payable (_escrowAgent),
            escrowStatus: status.pending
        });


        emit fundsDeposited( escrowCount, _sellerId, _buyerId, msg.value, _escrowAgent);

     }

     function checkStatus (uint256 _escrowId) external view returns (status) {
         return escrows[_escrowId].escrowStatus;
     }

     function ReleaseFunds ( uint256 _amount, address _seller, address _escrowAgent) public payable {
        require ( msg.value >= _amount, " Not enough funds");
    
        emit fundsReleased (_amount, _seller, _escrowAgent );


     }
}
