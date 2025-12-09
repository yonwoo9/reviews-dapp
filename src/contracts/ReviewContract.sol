// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReviewContract {
    struct Review {
        uint256 id;
        string title;
        string category;
        uint8 rating;
        string content;
        address author;
        uint256 timestamp;
    }
    
    Review[] public reviews;
    mapping(uint256 => Review) public reviewById;
    uint256 public reviewCount;
    uint256 public postFee = 0.001 ether; // 发布评论的费用
    address public owner;
    
    event ReviewPosted(
        uint256 indexed id,
        string title,
        string category,
        uint8 rating,
        address indexed author,
        uint256 timestamp
    );
    
    constructor() {
        owner = msg.sender;
    }
    
    function postReview(
        string memory _title,
        string memory _category,
        uint8 _rating,
        string memory _content
    ) public payable {
        require(msg.value >= postFee, "Insufficient fee");
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");
        
        reviewCount++;
        Review memory newReview = Review({
            id: reviewCount,
            title: _title,
            category: _category,
            rating: _rating,
            content: _content,
            author: msg.sender,
            timestamp: block.timestamp
        });
        
        reviews.push(newReview);
        reviewById[reviewCount] = newReview;
        
        emit ReviewPosted(
            reviewCount,
            _title,
            _category,
            _rating,
            msg.sender,
            block.timestamp
        );
    }
    
    function getAllReviews() public view returns (Review[] memory) {
        return reviews;
    }
    
    function getReviewCount() public view returns (uint256) {
        return reviewCount;
    }
    
    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
    
    function updateFee(uint256 _newFee) public {
        require(msg.sender == owner, "Only owner can update fee");
        postFee = _newFee;
    }
}
