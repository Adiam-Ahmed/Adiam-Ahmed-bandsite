const commentForm = document.querySelector('.comment-form');

const commentListElement = document.querySelector('.comment-list')

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

commentForm.addEventListener('submit',function(e){
    e.preventDefault();
    

    const userNameVal = e.target.userName.value
    const commentVal = e.target.userComment.value


    const newCommentsObj= {
        userName: userNameVal,
        comment: commentVal,
    };

    // Add new comment object to comment array

    commentArray.push(newCommentsObj);

    renderAllComment()

});

function createComment(commentObj){

    const commentElement = document.createElement('article');



    commentElement.classList.add('comment-section__item');

    commentElement.innerText = commentObj.comment;

    commentListElement.appendChild(commentElement)

}

function renderAllComment(){

    commentListElement.innerHTML = '';

    commentArray.forEach(comment => {
        return createComment(comment);
    });

};

renderAllComment()