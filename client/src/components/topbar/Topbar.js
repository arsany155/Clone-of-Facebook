import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useContext, useState ,  useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { withStyles } from '@material-ui/core/styles';
import {styles} from './topbarStyle'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SimplePopover from '../popover/SimplePopover';

function Topbar({ classes }) {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [anchorEl, setAnchorEl] = useState(null);
    const friendName = useRef();

    const openProfileDetails = (event) => {
        console.log('Clicked ' + event.currentTarget )
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        window.location.href = "/profile/" + friendName.current.value;
        return false;
    }

    return (
        <div className={classes.topbarContainer}>
            <div className={classes.topbarLeft}>
            <Link to='/' style={{textDecoration: 'none'}}>
                <span className={classes.logo}>Social</span>
            </Link>
            </div>
            <div className={classes.topbarCenter}>
                <div className={classes.searchbar}>
                    <Search className={classes.searchIcon}/>
                    <form className="friendSearch" onSubmit={submitHandler}>
                        <input type="text" placeholder="Search for friends " className={classes.searchInput}  ref={friendName}/>
                    </form>
                </div>
            </div>
            <div className={classes.topbarRight}>
                <div className={classes.topbarLinks}>
                    <span className={classes.topbarLink}>Homepage</span>
                    <span className={classes.topbarLink}>Timeline</span>
                </div>
                <div className={classes.topbarIcons}>
                    <div className={classes.topbarIconItem}>
                        <Person/>
                        <span className={classes.topbarIconBadge}>1</span>
                    </div>
                    <div className={classes.topbarIconItem}>
                        <Link to='/messenger' style={{textDecoration: 'none', color: 'inherit'}}>
                            <Chat/>
                        </Link>
                        <span className={classes.topbarIconBadge}>3</span>
                    </div>
                    <div className={classes.topbarIconItem}>
                        <Notifications/>
                        <span className={classes.topbarIconBadge}>1</span>
                    </div>
                </div>
                <div className={classes.userInfo}>
                    <Link to={`/profile/${user.username}`} style={{textDecoration:'none', display: 'flex', alignItems: 'center'}}>
                        <img
                            src={
                            user.profilePicture
                                ? PF + user.profilePicture
                                : PF + "person/noAvatar.png"
                            }
                            alt=""
                            className={classes.topbarImg}
                        />
                        <p className={classes.username}>{user.username}</p>
                    </Link>
                    <KeyboardArrowDownIcon className={classes.downArrow} onClick={openProfileDetails} />
                    <SimplePopover anchorEl={anchorEl} handleClose={handleClose} />
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(Topbar);