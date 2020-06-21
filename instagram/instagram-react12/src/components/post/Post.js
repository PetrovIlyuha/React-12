import React, { useState, useContext } from "react";
import { usePostStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import {
  MoreIcon,
  CommentIcon,
  ShareIcon,
  UnlikeIcon,
  LikeIcon,
  RemoveIcon,
  SaveIcon,
} from "../../icons";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  Hidden,
  Divider,
  TextField,
  Avatar,
} from "@material-ui/core";
import { UserContext } from "../../App";
import OptionsDialog from "../shared/OptionsDialog";
import PostSkeleton from "../post/PostSkeleton";
import { useSubscription, useMutation } from "@apollo/react-hooks";
import { GET_POST } from "../../graphql/subscriptions";
import {
  LIKE_POST,
  UNLIKE_POST,
  SAVE_POST,
  UNSAVE_POST,
  CREATE_COMMENT,
} from "../../graphql/mutations";

function Post({ postId }) {
  const classes = usePostStyles();
  const [showOptionsDialog, setOptionsDialog] = useState(false);
  const variables = { postId };
  const { data, loading } = useSubscription(GET_POST, { variables });

  if (loading) return <PostSkeleton />;
  const {
    media,
    id,
    user,
    caption,
    comments,
    likes,
    likes_aggregate,
    saved_posts,
    location,
    created_at,
  } = data.posts_by_pk;
  const likesCount = likes_aggregate.aggregate.count;
  return (
    <div className={classes.postContainer}>
      <article className={classes.article}>
        {/* Post Header */}
        <div className={classes.postHeader}>
          <UserCard user={user} location={location} avatarSize={32} />
          <MoreIcon
            className={classes.moreIcon}
            style={{ cursor: "pointer" }}
            onClick={() => setOptionsDialog(true)}
          />
        </div>
        {/* Post Image */}
        <Link to={`/p/${id}`}>
          <div className={classes.postImage}>
            <img src={media} alt="Post Media" className={classes.image} />
          </div>
        </Link>
        {/* Post buttons */}
        <div className={classes.postButtonsWrapper}>
          <div className={classes.postButtons}>
            <LikeButton likes={likes} postId={id} authorId={user.id} />
            <Link to={`/p/${id}`}>
              <CommentIcon />
            </Link>
            <ShareIcon />
            <SaveButton savedPosts={saved_posts} postId={id} />
          </div>
          <Typography className={classes.likes} variant="subtitle2">
            <span>
              {likesCount === 0
                ? "0 likes"
                : likesCount === 1
                ? "1 like"
                : `${likesCount} likes`}
            </span>
          </Typography>
          <div
            style={{
              overflowY: "scroll",
              padding: "16px 12px",
              height: "100%",
            }}
          >
            <AuthorCaption
              user={user}
              createdAt={created_at}
              caption={caption}
            />
            {comments.map((comment) => (
              <UserComment key={comment.id} comment={comment} />
            ))}
          </div>
          <Typography color="textSecondary" className={classes.datePosted}>
            5 Days Ago
          </Typography>
          <Hidden xsDown>
            <div className={classes.commentContainer}>
              <Divider />
              <Comment postId={id} />
            </div>
          </Hidden>
        </div>
      </article>
      {showOptionsDialog && (
        <OptionsDialog onClose={() => setOptionsDialog(false)} />
      )}
    </div>
  );
}

function AuthorCaption({ user, createdAt, caption }) {
  const classes = usePostStyles();
  return (
    <div style={{ display: "flex" }}>
      <Avatar
        src={user.profile_image}
        alt="User avatar"
        style={{ marginRight: 14, width: 32, height: 32 }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to={user.username}>
          <Typography
            variant="subtitle2"
            component="span"
            className={classes.username}
          >
            {user.username}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            className={classes.postCaption}
            style={{ paddingLeft: 0 }}
            dangerouslySetInnerHTML={{ __html: caption }}
          ></Typography>
          <Typography
            style={{ marginTop: 16, marginBottom: 4, display: "inline-block" }}
            color="textSecondary"
            variant="caption"
          >
            {createdAt}
          </Typography>
        </Link>
      </div>
    </div>
  );
}

function UserComment({ comment }) {
  const classes = usePostStyles();
  return (
    <div style={{ display: "flex" }}>
      <Avatar
        src={comment.user.profile_image}
        alt="User avatar"
        style={{ marginRight: 14, width: 32, height: 32 }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to={comment.user.username}>
          <Typography
            variant="subtitle2"
            component="span"
            // className={classes.username}
          >
            {comment.user.username}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            className={classes.postCaption}
            style={{ paddingLeft: 0 }}
          >
            {comment.content}
          </Typography>
          <Typography
            style={{ marginTop: 16, marginBottom: 4, display: "inline-block" }}
            color="textSecondary"
            variant="caption"
          >
            {comment.created_at}
          </Typography>
        </Link>
      </div>
    </div>
  );
}

function LikeButton({ likes, authorId, postId }) {
  const classes = usePostStyles();
  const { currentUserId } = useContext(UserContext);
  const isAlreadyLiked =
    likes && likes.some(({ user_id }) => user_id === currentUserId);
  const [liked, setLiked] = useState(isAlreadyLiked);
  const Icon = liked ? UnlikeIcon : LikeIcon;
  const className = liked ? classes.liked : classes.like;
  const onClick = liked ? handleUnlike : handleLike;
  const [likePost] = useMutation(LIKE_POST);
  const [unlikePost] = useMutation(UNLIKE_POST);
  const variables = {
    postId,
    userId: currentUserId,
    // profileId:
  };

  function handleLike() {
    setLiked(true);
    likePost({ variables });
  }

  function handleUnlike() {
    setLiked(false);
    unlikePost({ variables });
  }

  return <Icon className={className} onClick={onClick} />;
}

function SaveButton({ savedPosts, postId }) {
  const classes = usePostStyles();
  const { currentUserId } = useContext(UserContext);
  const alreadySavedPost = savedPosts.some(
    ({ user_id }) => user_id === currentUserId
  );
  const [saved, setSaved] = useState(alreadySavedPost);
  const Icon = saved ? RemoveIcon : SaveIcon;
  const onClick = saved ? handleRemove : handleSave;
  const [savePost] = useMutation(SAVE_POST);
  const [unsavePost] = useMutation(UNSAVE_POST);
  const variables = {
    postId,
    userId: currentUserId,
  };
  function handleRemove() {
    setSaved(false);
    unsavePost({ variables });
  }

  function handleSave() {
    setSaved(true);
    savePost({ variables });
  }

  return <Icon className={classes.saveIcon} onClick={onClick} />;
}

function Comment({ postId }) {
  const classes = usePostStyles();
  const [content, setContent] = useState("");
  const [createComment] = useMutation(CREATE_COMMENT);
  const { currentUserId } = useContext(UserContext);

  const handleAddComment = () => {
    const variables = {
      content,
      postId,
      userId: currentUserId,
    };
    createComment({ variables });
  };

  return (
    <div className={classes.commentContainer}>
      <TextField
        // fullWidth
        value={content}
        placeholder="Add a comment..."
        multiline
        rowsMax={2}
        rows={10}
        className={classes.textField}
        onChange={(e) => setContent(e.target.value)}
        InputProps={{
          classes: {
            root: classes.root,
            underline: classes.underline,
          },
        }}
      />
      <Button
        onClick={handleAddComment}
        color="primary"
        className={classes.commentButton}
        disabled={!content.trim()}
      >
        Post
      </Button>
    </div>
  );
}

export default Post;
