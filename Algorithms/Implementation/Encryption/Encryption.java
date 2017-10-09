import java.io.*;
import java.util.*;
import java.math.*;

public class Solution {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        
        String input = in.next();
        int cols = 0;
        int rows = 0;
        
        double sqrt = Math.sqrt(input.length());
        rows = (int)Math.floor(sqrt);
        cols = (int)Math.ceil(sqrt);
        
        for(int i = 1; i <= cols; ++i) {
            for(int j = 0; j <= rows; ++j) {
                if(j*cols+i-1 < input.length())
                System.out.print(input.charAt(j*cols+i-1));
            }
            
            System.out.print(" ");
        }
    }
}