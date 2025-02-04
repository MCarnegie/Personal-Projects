import java.io.*;
import java.lang.reflect.Array;
import java.util.*;

public class Main {
  public static void main(String [] args) throws Exception {
    Scanner in = new Scanner(System.in);
    int n = in.nextInt();
    //hat circle S1 2024 CCC - completed 15 points
    // int[] nums = new int[n];
    // for(int i = 0; i<n; i++){
    //     nums[i] = in.nextInt();
    // }

    // int counter = 0;
    // int howMuchLookingForward = n/2;
    // for(int z = 0; z<n-howMuchLookingForward; z++){
    //     if(nums[z] == nums[z+howMuchLookingForward]){
    //         counter+=2;
    //     }
    // }
    // System.out.println(counter);

    //Triagalaine S1 2023 CCC - completed 15 points
//     in.nextLine();
//     String first = in.nextLine();

//     String second = in.nextLine();
//     in.close();

//     String[] a1 = new String[n];
//     int placer = 0;
//     for(int i = 0; i<first.length(); i++){
//         if(first.substring(i, i+1).equals(" ") == false){
//             a1[placer] = first.substring(i, i+1);
//             placer++;
//         }
//     }
    
//     String[] a2 = new String[n];
//     placer = 0;
//     for(int i = 0; i<second.length(); i++){
//       if(second.substring(i, i+1).equals(" ") == false){
//           a2[placer] = second.substring(i, i+1);
//           placer++;
//       }
//   }
//   //check every filled square: starts off with 3 for everything adjacent to it take off one
//     int totalMeters = 0;
//     for(int i = 0; i<n; i++){
//         if(a1[i].equals("1")){
//             int tapeAdd = 3;

//             if(i!=n-1 && a1[i].equals(a1[i+1]))
//                 tapeAdd--;
//             if(i!=0 && a1[i].equals(a1[i-1]))
//                 tapeAdd--;
            
//             totalMeters+=tapeAdd;
//         }
//         if(a2[i].equals("1")){
//             int tapeAdd = 3;

//             if(i!=n-1 && a2[i].equals(a2[i+1]))
//                 tapeAdd--;
//             if(i!=0 && a2[i].equals(a2[i-1]))
//                 tapeAdd--;
            
//             totalMeters+=tapeAdd;
//         }
//         if(a2[i].equals("1") && a1[i].equals("1") && i%2 == 0)
//             totalMeters-=2;
//     }
    
//     System.out.println(totalMeters);


    
  }
}