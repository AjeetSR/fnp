import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import rupeeIcon from "./rupeeIcon.jpg";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarRatings from 'react-star-ratings';
import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const data = [
    {
      id: '1',
      name: 'Home',
    },
    {
      id: '2',
      name: 'About Use',
    },
    {
      id: '3',
      name: 'Cakes',
      children: [
        {
          id: '4',
          name: 'Chocolate Cakes',
        },
        {
          id: '5',
          name: 'Vanilla Cakes',
        }
      ],
    },
    {
      id: '6',
      name: 'Flowers',
      children: [
        {
          id: '7',
          name: 'Roses',
        },
        {
          id: '8',
          name: 'Lilies',
        }
      ],
    },
    {
      id: '9',
      name: 'Contact Us',
    }
  ]


function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [products,setProducts] = React.useState([]);
  const [loadMore,setLoadMore] = React.useState(1);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  //fetch the products
  useEffect(() => {
    const fetchData = async()=>{
      const res = fetch("http://www.mocky.io/v2/5ed68221340000480106dae9.").then(res => res.json());
      res.then(
        (result) => {
          setProducts(result)
        },
        (error) => {
          alert(error)
        }
      )
    }
  //  if(products.length!==products.totalProducts)
      fetchData();
  }, [loadMore])

  //Menu and sub menu items
  const renderTree = (nodes) =>{
    return (
      nodes.map((node)=>{
       return <TreeItem key={node.id} nodeId={node.id} label={node.name} style={{padding:"5px"}}>
        {Array.isArray(node.children) ? node.children.map((subNode) => <TreeItem style={{padding:"5px"}} key={subNode.id} nodeId={subNode.id} label={subNode.name}>
        </TreeItem>) : null}
      </TreeItem>
      })
    );
  }

//Header Component
  const HeaderComponent = () =>(
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor:"#038e3e",position:"fixed"}}>
      {/* <img src={"https://i7.fnp.com/assets/images/new-fnplogo.png" }/> */}
        <Toolbar>
        <div>
        <IconButton ref={anchorRef} aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper style={{padding:"10px"}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <TreeView
                    className={classes.root}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpanded={['root']}
                    defaultExpandIcon={<ChevronRightIcon />}>
                    {renderTree(data)}
                  </TreeView>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <Typography variant="h6" className={classes.title}>
            fernsnpetals
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )

  return (
    <>
    <HeaderComponent/>
    <Container className={classes.cardGrid} maxWidth="md" style={{paddingTop:"65px"}}>
          {/*infinte scroll*/}
      <InfiniteScroll
        dataLength={products.length}
        next={()=>setLoadMore(loadMore+1)}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <Grid container spacing={4}>
          {products.map((card,i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Card className={classes.card} >
                  <span style={{ position: "absolute"}}>
                  {card?.bestSeller?<span style={{padding: ".25rem", borderBottomRightRadius: ".25rem",marginRight:"-4.7rem", backgroundColor: "#038e3e", color: "white"}}>BestSeller</span>:null}
                  <span style={{marginLeft:"15.7rem"}}>{card?.favorite?<FavoriteIcon/>:<FavoriteBorderIcon/>}</span>
                  </span>
                  <img style={{width:"100%"}}  src={card.imgSrc} alt=""/>
                <CardContent className={classes.cardContent} style={{textAlign:"center"}}>
                  <Typography >
                  { ((card.title).length > 30) ? 
                    ((card.title.substring(0,card.title.length-8)) + '...') : 
                    card.title }
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h2">
                    <img style={{height: ".75rem", width: ".75rem"}} src={rupeeIcon} alt="rupeeIcon"/>
                    {card.discountPercentage?<span >{card.sellingPrice-Math.round(card.sellingPrice*(card.discountPercentage/100))}</span>:<span >{card.sellingPrice}</span>}
                  </Typography>
                  <Typography>{card.discountPercentage?
                    <>
                    <span style={{color:"green"}}>{card.discountPercentage}%</span>
                    <img style={{height: ".75rem", width: ".75rem"}} src={rupeeIcon} alt="rupeeIcon"/>
                    <span style={{textDecoration:"line-through", color:"grey"}}>{card.sellingPrice}</span>
                    </>:<span style={{color:"transparent"}}>-</span>}
                  </Typography>
                  <span style={{color:"#f9b212e8"}}>{card.ratingCount}</span>
                  <StarRatings
                    rating={card.ratingCount}
                    starRatedColor="#f9b212e8"
                    numberOfStars={5}
                    starDimension="15px"
                    starSpacing="1px"
                    name='rating'
                  />
                  <span >{card.reviewCount} Reviews</span>
                  <Typography>
                </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>         
    </Container>
  </>
  );
}

export default App;
