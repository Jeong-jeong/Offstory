import { createInstance } from './index'

const instance = createInstance()

function getConversations() {
  const getConversationsUrl = 'messages/conversations'
  return instance.get(getConversationsUrl)
}

function getSpecificMessage(userId) {
  const messageUrl = 'messages'
  return instance.get(messageUrl)
}

export { getConversations, getSpecificMessage }
