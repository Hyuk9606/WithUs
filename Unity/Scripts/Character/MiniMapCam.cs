using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;
using Cinemachine;
using UnityEngine.SceneManagement;

public class MiniMapCam : MonoBehaviour
{
    private PhotonView pv;
	private GameObject virtualCamera;


    // Start is called before the first frame update
    void Start()
    {
        pv = GetComponent<PhotonView>(); 
	    virtualCamera = GameObject.FindGameObjectWithTag("MiniMapCam");

        if (SceneManager.GetActiveScene().name != "DemoScene" && pv.IsMine)
		{
		    virtualCamera.GetComponent<CinemachineVirtualCamera>().Follow = transform;
		    // virtualCamera.Follow = transform;
		    virtualCamera.GetComponent<CinemachineVirtualCamera>().LookAt = transform;
		}
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
