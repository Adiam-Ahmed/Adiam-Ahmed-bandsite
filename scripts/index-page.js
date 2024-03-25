const commentForm = document.querySelector('.comment-form');
const commentListElement = document.querySelector('.user-comment-entries');
const commentData = new BandsiteApi(apiKey);


function renderCommentElement(commentObj) {

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
    userCommentName.innerText = commentObj.name;
    userCommentDetails.appendChild(userCommentName);

    const userCommentDate = document.createElement('time');
    userCommentDate.classList.add('user-comment__date');
    const commentDate = new Date(commentObj.timestamp);
    const formattedDate = `${commentDate.getDate()} / 0${commentDate.getMonth()} / ${commentDate.getFullYear()}`;
    userCommentDate.setAttribute('datetime', commentObj.timestamp);
    userCommentDate.innerText = formattedDate;
    userCommentDetails.appendChild(userCommentDate);


    const commentDiv = document.createElement('div');
    commentDiv.classList.add('user-comment__paragraph');
    commentDiv.innerText = commentObj.comment
    commentArticleEl.appendChild(commentDiv);
};

async function getAllComments() {
    try {

        const getAllCommentsData = await commentData.getComments();
        commentListElement.innerHTML = '';
        getAllCommentsData.forEach(comment => {
            renderCommentElement(comment);
        });

    } catch (error) {
        console.log("hello getallcomments no work")

    }

}


commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userNameVal = e.target.userName.value
    const commentVal = e.target.userComment.value

    const newCommentsObj = {
        name: userNameVal,
        comment: commentVal

    };
    console.log(newCommentsObj)
    try {
        const newCommentData = await commentData.postComments(newCommentsObj);
        console.log("New comment check", newCommentData);
        getAllComments();
    } catch (error) {
        console.log("hopefully no error")
    }

    e.target.reset();
});

getAllComments()

