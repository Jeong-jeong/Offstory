import { createInstance } from './index'

const instance = createInstance()

function readPost(postId) {
  const readPostUrl = `posts/${postId}`
  return instance.get(readPostUrl)
}

function createComment(userData) {
  const createCommentUrl = 'comments/create'
  return instance.post(createCommentUrl, userData)
}

function deleteComment(userData) {
  const deleteCommentUrl = 'comments/delete'
  return instance.delete(deleteCommentUrl, userData)
}

export { readPost, createComment, deleteComment }
