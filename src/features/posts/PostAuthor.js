import { useSelector } from "react-redux"
import { selectUserById } from "../users/usersSlice"
import { Link } from "react-router-dom"

export const PostAuthor = ({ userId }) => {
  const author = useSelector((state) => selectUserById(state, userId))

  return (
    <Link to={`/users/${userId}`}>
      by {author ? author.name : "Unknown author"}
    </Link>
  )
}
