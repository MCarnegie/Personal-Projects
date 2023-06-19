import java.awt.*;
import java.awt.event;
import java.util.*;
import javax.swing.*;


public class GamePanel extends JPanel implements Runnable {
        static final int GAME_WIDTH = 500;
        static final int GAME_HEIGHT = 500;
        static final Dimension SCREEN_SIZE = new Dimension(GAME_WIDTH, GAME_HEIGHT);
        Thread gameThread;
        Image image;
        Graphics graphics;
        Random random;
        Mine mine;

        GamePanel(){

        }
}