using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;
using UnityEngine.SceneManagement;

public class PlayerRotate : MonoBehaviour
{
	private PhotonView pv;
	private Animator animator;
	float rotSpeed = 150.0f;
	float mx = 0;

	// Start is called before the first frame update
	void Start()
	{
		animator = GetComponent<Animator>();
		pv = GetComponent<PhotonView>();
	}

	// Update is called once per frame
	// void Update()
	// {
	// 	if (SceneManager.GetActiveScene().name != "DemoScene" && pv.IsMine)
	// 	{
	// 		// 추가한부분
	// 		if(animator.GetBool("toSit")==false)
	// 		{	
	// 		float mouse_X = Input.GetAxis("Mouse X");
	// 		mx += mouse_X * rotSpeed * Time.deltaTime;
	// 		transform.eulerAngles = new Vector3(0, mx, 0);
	// 		}

	// 	}
	// }
	void Update()
    {
        if (SceneManager.GetActiveScene().name != "DemoScene" && pv.IsMine)
        {

            // bool buttonD = Input.GetKey("Alt Positive Button");
            bool buttonD = Input.GetKey(KeyCode.D);
            bool buttonA = Input.GetKey(KeyCode.A);
            bool buttonS = Input.GetKey(KeyCode.S);
            bool buttonW = Input.GetKey(KeyCode.W);
            // 추가한부분
            if (animator.GetBool("toSit") == false)
            {
                float mouse_X = Input.GetAxis("Mouse X");
                mx += mouse_X * rotSpeed * Time.deltaTime;

                if (buttonD)  // 우클릭 - D
                {
                    if (buttonW)
                    {
                        transform.eulerAngles = new Vector3(0, mx + 45, 0);
                    }
                    else
                    {
                        // transform.eulerAngles = new Vector3(0, mx + 90, 0);
						// animator.SetBool("rightwalk", true);
                    }
                }
                else if (buttonA) // 좌클릭 - A
                {
                    if (buttonW)
                    {
                        transform.eulerAngles = new Vector3(0, mx - 45, 0);
                    }
                    else
                    {
                        // transform.eulerAngles = new Vector3(0, mx - 90, 0);
						// animator.SetBool("leftwalk", true);
                    }
                }
                else
                {
                    transform.eulerAngles = new Vector3(0, mx, 0);
                }
            }
        }
    }
}
