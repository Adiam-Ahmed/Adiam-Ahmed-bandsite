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
    const currentDate = new Date();
    const timeDifferenceDays = Math.floor((currentDate - commentDate) / (1000 * 60 * 60 * 24))
    let formattedDate

    //Moment.js to Parse, validate, manipulate, and display dates and times in JavaScript

    if (timeDifferenceDays < 1) {
        formattedDate = moment(commentObj.timestamp).fromNow();
    } else if (timeDifferenceDays < 2) {
        formattedDate = moment().subtract(1, 'days').fromNow();;
    } else if (timeDifferenceDays < 30) {
        formattedDate = `${timeDifferenceDays} days ago`
    } else {
        formattedDate = `${commentDate.getDate()} / ${commentDate.getMonth() + 1} / ${commentDate.getFullYear()}`
    }
    userCommentDate.setAttribute('datetime', commentObj.timestamp);
    userCommentDate.innerText = formattedDate;
    userCommentDetails.appendChild(userCommentDate);


    const commentDiv = document.createElement('div');
    commentDiv.classList.add('user-comment__paragraph');
    commentDiv.innerText = commentObj.comment
    commentArticleEl.appendChild(commentDiv);

    const likeDiv = document.createElement('div');
    likeDiv.classList.add('user-comment__like-div');
    commentArticleEl.appendChild(likeDiv);
    const likeBtn = document.createElement('button')
    likeBtn.classList.add("user-comment__like-btn")
    likeDiv.appendChild(likeBtn);

    const likeIcon = document.createElement('img');
    likeIcon.classList.add("user-comment__like-icon");
    likeIcon.setAttribute('src', '../assets/Icons/SVG/icon-like.svg');
    likeIcon.setAttribute('alt', 'like button');
    likeBtn.appendChild(likeIcon);

    const likesDisplay = document.createElement('span');
    likesDisplay.classList.add('user-comment__likes');
    likesDisplay.innerText = commentObj.likes;
    likeDiv.appendChild(likesDisplay);

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add("user-comment__delete-btn")
    likeDiv.appendChild(deleteBtn);

    const deleteIcon = document.createElement('img');
    deleteIcon.classList.add("user-comment__delete-icon");
    deleteIcon.setAttribute('src', '../assets/Icons/SVG/icon-delete.svg');
    deleteIcon.setAttribute('alt', 'delete button');
    deleteBtn.appendChild(deleteIcon);


    likeBtn.addEventListener("click", async () => {
        try {
            const likes = await commentData.getLikes(commentObj.id);
            likesDisplay.innerText = likes;
        } catch (error) {
            console.log("Error occurred ");
        }
    });

    deleteBtn.addEventListener("click", async () => {
        try {
            await commentData.deleteComment(commentObj.id);
            commentSectionEl.remove();
        } catch (error) {
            console.log("Error occurred ");
        }
    });
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

    const userNameInput = e.target.userName
    const commentInput = e.target.userComment

    userNameInput.classList.remove('errors')
    commentInput.classList.remove('errors')

    let errors = false;

    if (userNameVal === "") {
        userNameInput.classList.add("errors");
        errors = true;
    }
    if (commentVal === "") {
        commentInput.classList.add("errors");
        errors = true;
    }

    if (errors) {
        return false;
    }

    const newCommentsObj = {
        name: userNameVal,
        comment: commentVal

    };
    try {
        const newCommentData = await commentData.postComments(newCommentsObj);
        getAllComments();
    } catch (error) {
        console.log("hopefully no error")
    }

    e.target.reset();
});

getAllComments()

