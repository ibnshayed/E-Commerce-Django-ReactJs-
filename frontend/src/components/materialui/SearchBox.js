import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useQuery } from '../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    // width: 400,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: theme.spacing(1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
    color: 'inherit',
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));


const SearchBox = () => {
  const classes = useStyles();

  const history = useHistory()

  let query = useQuery();

  const [keyword, setKeyword] = useState(query.get('keyword') != null ? query.get('keyword') : '')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword) {
      history.push(`/?keyword=${keyword}`)
    }
    else {
      history.push(history.location.pathname)
    }
  }

  return (
    <div className={classes.search}>
      <div component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search...' }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={keyword}
          onChange={ e => setKeyword(e.target.value)}
          
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          onClick={submitHandler}
        >
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default SearchBox