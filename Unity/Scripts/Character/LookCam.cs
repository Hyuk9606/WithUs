using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class LookCam : MonoBehaviour
{
    private Camera NameCam;

    private float scale;

    private float temp;

    void Start()
    {    
        
        NameCam = Camera.main;
        
        if(SceneManager.GetActiveScene().name != "Lobby")
        {
            gameObject.SetActive(false);
        } else {
            gameObject.SetActive(true);
        }
    }

    void Update()
    {
        transform.rotation = NameCam.transform.rotation;       
       
    }
}
