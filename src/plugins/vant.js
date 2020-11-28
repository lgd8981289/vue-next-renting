import { Button, Tabbar, TabbarItem, Swipe, SwipeItem, Image } from 'vant';
import 'vant/lib/index.css';

export default function initVant(app) {
  app.use(Button);
  app.use(Image);
  app.use(Tabbar);
  app.use(TabbarItem);
  app.use(Swipe);
  app.use(SwipeItem);
}
