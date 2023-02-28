import { useLayoutEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { formatDistanceToNow, parseISO } from "date-fns"
import { allNotificationsRead, fetchNotifications } from "./notificationsSlice"
import classnames from "classnames"

export const NotificationsList = () => {
  const notifications = useSelector((state) => state.notifications)
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === notification.user) || {
      name: "Unknown User",
    }

    const notificationClassname = classnames("notification", {
      new: notification.isNew,
    })

    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })
  console.log("render")
  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}
