import React, { useState, useEffect, useRef } from "react";
import { useNavbarStyles, WhiteTooltip, RedTooltip } from "../../styles";
import {
  AppBar,
  Hidden,
  InputBase,
  Avatar,
  Fade,
  Zoom,
  Grid,
  Typography,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import logo from "../../images/logo.png";
import {
  LoadingIcon,
  AddIcon,
  LikeIcon,
  LikeActiveIcon,
  ExploreIcon,
  ExploreActiveIcon,
  HomeIcon,
  HomeActiveIcon,
} from "../../icons";
import NotificationTooltip from "../notification/NotificationTooltip";
import NotificationList from "../notification/NotificationList";
import { useNProgress } from "@tanem/react-nprogress";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { SEARCH_USERS } from "../../graphql/queries";
import { UserContext } from "../../App";
import AddPostDialog from "../post/AddPostDialog";

function Navbar({ minimalNavbar }) {
  const classes = useNavbarStyles();
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const history = useHistory();
  const path = history.location.pathname;

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingPage(false);
    }, 3000);
  }, [path]);
  return (
    <>
      <Progress isAnimating={isLoadingPage} />
      <AppBar className={classes.appBar}>
        <section className={classes.section}>
          <Logo />
          {!minimalNavbar && (
            <>
              <Search history={history} />
              <Links path={path} />
            </>
          )}
        </section>
      </AppBar>
    </>
  );
}

function Logo() {
  const classes = useNavbarStyles();
  return (
    <div className={classes.logoContainer}>
      <Link to="/">
        <div className={classes.logoWrapper}>
          <img src={logo} alt="Instagram" className={classes.logo} />
        </div>
      </Link>
    </div>
  );
}

function Search({ history }) {
  const classes = useNavbarStyles();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [
    searchUsers,
    { called, loading: searchUsersLoading, data },
  ] = useLazyQuery(SEARCH_USERS);

  const hasResults = Boolean(query) && results.length > 0;

  useEffect(() => {
    if (!query.trim()) return;
    setLoading(true);
    const variables = { $query: `%${query}%` };
    searchUsers({ variables });

    if (data) {
      console.log(data);
      setResults(data.users);
      setLoading(false);
    }
  }, [query, data, searchUsers]);

  const handleClearInput = () => {
    setQuery("");
  };
  return (
    <Hidden xsDown>
      <WhiteTooltip
        arrow
        interactive
        TransitionComponent={Fade}
        open={hasResults}
        title={
          hasResults && (
            <Grid className={classes.resultContainer} container>
              {results.map((result) => (
                <Grid
                  key={result.id}
                  onClick={() => {
                    history.push(`/${result.username}`);
                  }}
                  item
                  className={classes.resultLink}
                >
                  <div className={classes.resultWrapper}>
                    <div className={classes.avatarWrapper}>
                      <Avatar src={result.profile_image} alt="User Avatar" />
                    </div>
                    <div className={classes.nameWrapper}>
                      <Typography variant="body1">{result.username}</Typography>
                      <Typography variant="body2">{result.name}</Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          )
        }
      >
        <InputBase
          className={classes.input}
          onChange={(event) => setQuery(event.target.value)}
          startAdornment={<span className={classes.searchIcon} />}
          endAdornment={
            loading ? (
              <LoadingIcon />
            ) : (
              <span onClick={handleClearInput} className={classes.clearIcon} />
            )
          }
          placeholder="Search..."
          value={query}
        />
      </WhiteTooltip>
    </Hidden>
  );
}

function Links({ path }) {
  const { me } = React.useContext(UserContext);
  const classes = useNavbarStyles();
  const [showList, setShowList] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [media, setMedia] = useState(null);
  const [showAddPostDialog, setAddPostDialog] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleHideTooltip();
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  const handleToggleList = () => {
    setShowList((prev) => !prev);
  };

  const handleHideTooltip = () => {
    setShowTooltip(false);
  };

  const handleHideList = () => {
    setShowList(false);
  };
  const openFileInput = () => {
    inputRef.current.click();
  };

  const handleAddPost = (e) => {
    setMedia(e.target.files[0]);
    setAddPostDialog(true);
  };
  const handleClose = () => {
    setAddPostDialog(false);
  };

  return (
    <div className={classes.linksContainer}>
      {showList && <NotificationList handleHideList={handleHideList} />}
      <div className={classes.linksWrapper}>
        {showAddPostDialog && (
          <AddPostDialog media={media} handleClose={handleClose} />
        )}
        <Hidden xsDown>
          <input
            type="file"
            style={{ display: "none" }}
            ref={inputRef}
            onChange={handleAddPost}
          />
          <AddIcon onClick={openFileInput} />
        </Hidden>
        <Link to="/">{path === "/" ? <HomeActiveIcon /> : <HomeIcon />}</Link>
        <Link to="/explore">
          {path === "/" ? <ExploreIcon /> : <ExploreActiveIcon />}
        </Link>
        <RedTooltip
          arrow
          open={showTooltip}
          onOpen={handleHideTooltip}
          TransitionComponent={Zoom}
          title={<NotificationTooltip />}
        >
          <div className={classes.notifications} onClick={handleToggleList}>
            {showList ? <LikeActiveIcon /> : <LikeIcon />}
          </div>
        </RedTooltip>
        <Link to={`/${me.username}`}>
          <div
            className={path === `/${me.username}` ? classes.profileActive : ""}
          >
            <Avatar src={me.profile_image} className={classes.profileImage} />
          </div>
        </Link>
      </div>
    </div>
  );
}

function Progress({ isAnimating }) {
  const classes = useNavbarStyles();
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <div
      className={classes.progressContainer}
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      <div
        className={classes.progressBar}
        style={{
          marginLeft: `${(-1 + progress) * 100}%`,
          transition: `margin-left ${animationDuration}ms linear`,
        }}
      >
        <div className={classes.progressBackground}></div>
      </div>
    </div>
  );
}
export default Navbar;
