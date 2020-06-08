import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
// import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Link from '@material-ui/core/Link';

import Header from './Header';
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1];



const HomeContent = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Header/>
      <React.Fragment>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Welcome to college++
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
              The one stop for all your college needs!
              Black Lives Matter. Support the Equal Justice Initiative.
              </Typography>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={12} md={12}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://www.callcentrehelper.com/images/stories/2014/02/chasing-clock-businessperson-760.png"
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h3" component="h1" align="center">
                        Track your attendance
                      </Typography>
                      <Typography align="center">
                        We'll keep track of your attendance, so you can keep track of how much money you owe in pec market.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={12} md={12}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://www.usnews.com/dims4/USNEWS/897fb9b/2147483647/thumbnail/640x420/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2Fe7%2F76%2Faa5f5ae74348a89fdbef6aba8964%2F140312-excellentgrade-stock.jpg"
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h3" component="h1" align="center">
                        Check your grades
                      </Typography>
                      <Typography align="center">
                        Check your grades now so that you don't get shocked later.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={12} md={12}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image = "https://www.epsa-online.org/wp-content/uploads/2019/02/calendar-3906791_960_720.jpg"
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h3" component="h1" align="center">
                        Know your time-table
                      </Typography>
                      <Typography align="center">
                        Yes, you have a time-table.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Created by
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Jaspreet | Utkarsh | Hardik | Dhruv | Vernie | Akhil
          </Typography>
        </footer>
        {/* End footer */}
      </React.Fragment>
    </React.Fragment>
    
  );
}

export default HomeContent;