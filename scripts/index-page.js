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
    console.log(commentObj.timestamp)
    const currentDate = new Date();
    const timeDifferenceDays = Math.floor((currentDate - commentDate) / (1000 * 60 * 60 * 24))
    let formattedDate

    //Moment.js to Parse, validate, manipulate, and display dates and times in JavaScript

    if (timeDifferenceDays < 1 ){
        formattedDate = moment(commentObj.timestamp).fromNow();
    }else if (timeDifferenceDays < 2){
        formattedDate = moment().subtract(1, 'days').fromNow();;
    }else if (timeDifferenceDays < 30){
        formattedDate = `${timeDifferenceDays} days ago`
    }else{
        formattedDate = `${commentDate.getDate()} / ${commentDate.getMonth() + 1} / ${commentDate.getFullYear()}`
    }
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

