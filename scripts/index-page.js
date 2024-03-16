const commentForm = document.querySelector('.comment-form');
const commentListElement = document.querySelector('.user-comment-entries')

const commentArray = [
    {
        userName: 'Victor Pinto',
        date: '11 /02 / 2023',
        comment: 'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.'
    },
    {
        userName: 'Christina Cabrera',
        date: '10/28/2023',
        comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        userName: 'Isaac Tadesse',
        date: '10/20/2023',
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
];

commentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const userNameVal = e.target.userName.value
    const commentVal = e.target.userComment.value
    const date = new Date()
    const formattedDate = `${date.getDate()} / 0${date.getMonth()} / ${date.getFullYear()}`;
    const newCommentsObj = {
        userName: userNameVal,
        date: formattedDate,
        comment: commentVal,
    };

    // Add new comment object to comment array

    commentArray.unshift(newCommentsObj);

    renderAllComment()

    e.target.reset();
});

function createComment(commentObj) {


    const commentSectionEl = document.createElement('section');
    commentSectionEl.classList.add('user-comment');
    commentListElement.appendChild(commentSectionEl);


    const commentAvatar = document.createElement('div');
    commentAvatar.classList.add('user-comment__avatar');
    commentSectionEl.appendChild(commentAvatar);

    const commentArticleEl = document.createElement('article');
    commentArticleEl.classList.add('user-comment__content');
    commentSectionEl.appendChild(commentArticleEl);

    const userCommentDetails = document.createElement('div');
    userCommentDetails.classList.add('user-comment__details');
    commentArticleEl.appendChild(userCommentDetails);


    const userCommentName = document.createElement('h3');
    userCommentName.classList.add('user-comment__name');
    userCommentName.innerText = commentObj.userName;
    userCommentDetails.appendChild(userCommentName);

    const userCommentDate = document.createElement('time');
    userCommentDate.classList.add('user-comment__date');
    userCommentDate.setAttribute('datetime', commentObj.date);
    userCommentDate.innerText = commentObj.date;
    userCommentDetails.appendChild(userCommentDate);
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('user-comment__paragraph');
    commentDiv.innerText = commentObj.comment
    commentArticleEl.appendChild(commentDiv);


}

function renderAllComment() {

    commentListElement.innerHTML = '';

    commentArray.forEach(comment => {
        return createComment(comment);
    });

};

renderAllComment()