import { createInstance } from './index'

const instance = createInstance()

function readPost(postId) {
  const readPostUrl = `posts/${postId}`
  return instance.post(readPostUrl)
}

function createComment(userData) {
  const createCommentUrl = 'comments/create'
  return instance.post(createCommentUrl, userData)
}

function deleteComment(commentId) {
  const deleteCommentUrl = 'comments/delete'
  return instance.post(deleteCommentUrl, commentId)
}

export { readPost, createComment, deleteComment }
