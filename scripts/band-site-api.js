const apiKey = "cac78227-cc78-4f45-8322-4fe6575d0c8e";

class BandsiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com/';
    }

    async getShowDates() {
        const showEndPoint = 'showdates'
        try {
            const fetchDataResponse = await axios.get(`${this.baseUrl}${showEndPoint}`, {
                params: {
                    api_key: this.apiKey
                }
            });
            return fetchDataResponse.data;
        } catch (error) {
            console.log('Sorry, Show data could not be fetched')
        }
    }

    async getComments() {
        const commentEndPoint = 'comments';
        try {
            const fetchCommentResponse = await axios.get(`${this.baseUrl}${commentEndPoint}`, {
                params: {
                    api_key: this.apiKey
                }
            });
            const fetchCommentDataResponseData = fetchCommentResponse.data;
            fetchCommentDataResponseData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            return fetchCommentDataResponseData;
        } catch (error) {
            console.log('Sorry, Show data could not be fetched')
        }
    }

    async postComments(userComment) {
        const postCommentEndPoint = 'comments';
        try {
            const postResponse = await axios.post(`${this.baseUrl}${postCommentEndPoint}?api_key=${this.apiKey}`, userComment)
            return postResponse.data;
        } catch (error) {
            console.log('Sorry, data could not be fetched')
        }
    }
    async getLikes(commentId) {
        const getLikesEndpoint = `https://unit-2-project-api-25c1595833b2.herokuapp.com/comments/${commentId}/like?api_key=${this.apiKey}`;
        try {
            const getLikesResponse = await axios.put(getLikesEndpoint);
            return getLikesResponse.data.likes;
        } catch (error) {
            console.log('Sorry, like could not be liked');
        }
    }
    async deleteComment(commentId) {
        const getDeleteEndpoint = `https://unit-2-project-api-25c1595833b2.herokuapp.com/comments/${commentId}?api_key=${this.apiKey}`;
        try {
            const getDeleteResponse = await axios.delete(getDeleteEndpoint);
            return getDeleteResponse.data.id;
        } catch (error) {
            console.log('Sorry, like could not be liked');
        }
    }
};



