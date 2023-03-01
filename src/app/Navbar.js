import { useDispatch, useSelector } from "react-redux"
import {
  fetchNotifications,
  selectAllNotifications,
} from "../features/notifications/notificationsSlice"
import { Link } from "react-router-dom"

export const Navbar = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }

  const unreadNotificationCount = notifications.filter(
    (notification) => !notification.read
  ).length

  let unreadNotificationsBadge
  if (unreadNotificationCount > 0) {
    unreadNotificationsBadge = (
      <span className="badge">{unreadNotificationCount}</span>
    )
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications {unreadNotificationsBadge}
            </Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
