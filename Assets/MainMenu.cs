using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MainMenu : MonoBehaviour
{
   public void OnClickNewGame()
   {
    //    Debug.Log("새 게임");
        SceneManager.LoadScene("game");
    
   }

   public void OnClickOption()
   {
       Debug.Log("옵션");
   } 

   public void OnClickNewQuit()
   {
#if UNITY_EDITOR 
        UnityEditor.EditorApplication.isPlaying = false;
#else
        Application.Quit();
#endif
   }  
}
