import React, { useRef } from "react";
import { useNotificationListStyles } from "../../styles";
import { Grid, Avatar, Typography } from "@material-ui/core";
import useOutsideClick from "@rooks/use-outside-click";
import { Link } from "react-router-dom";
import FollowButton from "../shared/FollowButton";
import { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CHECK_NOTIFICATIONS } from "../../graphql/mutations";
import { formatDateToNowShort } from "../../utils/formatDate";

function NotificationList({ handleHideList, notifications, currentUserId }) {
  const classes = useNotificationListStyles();
  const listContainerRef = useRef();
  useOutsideClick(listContainerRef, handleHideList);
  const [checkNotifications] = useMutation(CHECK_NOTIFICATIONS);
  useEffect(() => {
    const variables = {
      userId: currentUserId,
      lastChecked: new Date().toISOString(),
    };
    checkNotifications({ variables });
  }, [currentUserId, checkNotifications]);

  return (
    <Grid ref={listContainerRef} className={classes.listContainer} container>
      {notifications.map((notification) => {
        const isLike = notification.type === "like";
        const isFollow = notification.type === "follow";
        return (
          <Grid key={notification.id} item className={classes.listItem}>
            <div className={classes.listItemWrapper}>
              <div className={classes.avatarWrapper}>
                <Avatar
                  src={notification.user.profile_image}
                  alt="user avatar"
                />
              </div>
              <div className={classes.nameWrapper}>
                <Link to={`/${notification.user.username}`}>
                  <Typography variant="body1">
                    {notification.user.username}
                  </Typography>
                </Link>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={classes.typography}
                >
                  {isLike &&
                    `Likes your photo. ${formatDateToNowShort(
                      notification.created_at
                    )}`}
                  {isFollow &&
                    `started following you. ${formatDateToNowShort(
                      notification.created_at
                    )}`}
                </Typography>
              </div>
            </div>
            <div>
              {isLike && (
                <Link to={`/p/${notification.post.id}`}>
                  <Avatar
                    src={notification.post.media}
                    alt="post cover image"
                  />
                </Link>
              )}
              {isFollow && <FollowButton id={notification.user.id} />}
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default NotificationList;
