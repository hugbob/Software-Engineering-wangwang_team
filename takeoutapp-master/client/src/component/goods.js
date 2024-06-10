import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RecipeReviewCard=(props)=> {
  console.log(props)
  const [expanded, setExpanded] = React.useState(false);
  const [liked,Setliked]=React.useState(false)
  const [likesnum,Setlikesnum]=React.useState(props.Likes)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
const thefunction=()=>{
  props.Setadd({id:props.Id,name:props.Name,price:props.Price,restaurant_Restaurant_id:props.restaurant_Restaurant_id})
}
const changestatus=()=>{
  Setliked(true)
  Setlikesnum(likesnum+1)
  axios.post("http://localhost:3001/setlike",{id:props.Id,restaurant_id:props.restaurant_Restaurant_id}).then((err)=>{
      if(err.data!==null)
      alert("更新错误")
      else alert("感谢点赞")
    })
}
const resname=()=>{
  if(props.restaurant_Restaurant_id===1){
    return '曦'
  } else if(props.restaurant_Restaurant_id===2){
    return '晨'
  } else {
    return '双'
  }
}
  return (
    <Card sx={{ maxWidth: 310 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
           {resname()}
          </Avatar>
        }
        action={
          <IconButton aria-label="buy" onClick={thefunction}>
            <ShoppingCartIcon />
          </IconButton>
        }
        title={props.Name}
      />
      <CardMedia
        component="img"
        height="194"
        src={props.Image}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          价格：{props.Price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          好评：{likesnum}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={changestatus}  disabled={liked}>
          <FavoriteIcon color={liked?'error':'inherit'}/>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          妈妈的味道
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default RecipeReviewCard;