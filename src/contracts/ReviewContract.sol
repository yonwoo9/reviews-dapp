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
    
    // 防止重复评论：mapping(用户地址 => mapping(分类 => mapping(标题 => 是否已评论)))
    mapping(address => mapping(string => mapping(string => bool))) public hasReviewed;
    
    // 存储每个分类+标题的评论ID列表，用于搜索
    mapping(string => mapping(string => uint256[])) public reviewsByCategoryAndTitle;
    
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
        // 检查是否已经评论过同一分类下的同一标题
        require(
            !hasReviewed[msg.sender][_category][_title],
            "You have already reviewed this item in this category"
        );
        
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
        
        // 标记用户已评论
        hasReviewed[msg.sender][_category][_title] = true;
        
        // 添加到搜索索引
        reviewsByCategoryAndTitle[_category][_title].push(reviewCount);
        
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
    
    // 根据分类和标题搜索评论
    function getReviewsByCategoryAndTitle(
        string memory _category,
        string memory _title
    ) public view returns (Review[] memory) {
        uint256[] memory reviewIds = reviewsByCategoryAndTitle[_category][_title];
        Review[] memory result = new Review[](reviewIds.length);
        
        for (uint256 i = 0; i < reviewIds.length; i++) {
            result[i] = reviewById[reviewIds[i]];
        }
        
        return result;
    }
    
    // 获取某个分类和标题的评论数量
    function getReviewCountByCategoryAndTitle(
        string memory _category,
        string memory _title
    ) public view returns (uint256) {
        return reviewsByCategoryAndTitle[_category][_title].length;
    }
    
    // 检查用户是否已评论
    function checkIfReviewed(
        address _user,
        string memory _category,
        string memory _title
    ) public view returns (bool) {
        return hasReviewed[_user][_category][_title];
    }
}
