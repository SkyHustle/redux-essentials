import React from "react"
import { useAddReactionMutation } from "../api/apiSlice"

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
}

export const ReactionButtons = ({ post }) => {
  const [addReaction] = useAddReactionMutation()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        onClick={() => addReaction({ postId: post.id, reaction: name })}
        key={name}
        type="button"
        className="muted-button reaction-button"
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
