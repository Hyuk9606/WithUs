using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using Photon.Pun;
public class CamRotate : MonoBehaviour
{
	private Animator animator;
	float rotSpeed = 150.0f;
	// 회전 값을 누적할 변수
	float mx = 0;
	float my = 0;

	//추가한 부분
	float angle_x = 0;
	float angle_y = 0;

	private PhotonView pv;
	// Start is called before the first frame update
	void Start()
	{
		animator = GetComponent<Animator>();
		pv = GetComponent<PhotonView>();
	}

	// Update is called once per frame
	void Update()
	{			
		if(GameObject.FindWithTag("CamTag"))
		{
			// 마우스 입력 받기
			float mouse_X = Input.GetAxis("Mouse X");
			float mouse_Y = Input.GetAxis("Mouse Y");

			// 회전 방향 결정
			// Vector3 dir = new Vector3(-mouse_Y, mouse_X, 0);


			// 카메라 회전
			// transform.eulerAngles += dir * rotSpeed * Time.deltaTime;

			mx += mouse_X * rotSpeed * Time.deltaTime;
			my += mouse_Y * rotSpeed * Time.deltaTime;

			my = Mathf.Clamp(my, -15, 15);
			
			// 아래는 추가한 부분
			if(animator.GetBool("toSit")==false)
			{
				
				transform.eulerAngles = new Vector3(-my, mx, 0);
				if(Input.GetKeyDown(KeyCode.X) && animator.GetBool("toSit")==false)
				{
					animator.SetBool("toSit", true);
					angle_x = mx;
					angle_y = my;
				}
			// transform.eulerAngles = new Vector3(0, mx, 0);
			}
			else if(animator.GetBool("toSit")==true)
			{	
					
				mx = Mathf.Clamp(mx, angle_x-90, angle_x+90);
				transform.eulerAngles = new Vector3(-my, mx, 0);
				if(Input.GetKeyDown(KeyCode.X) && animator.GetBool("toSit")==true)
				{
					mx = angle_x;
					my = angle_y;
					animator.SetBool("toSit", false);
				}
			}
		}
		
	}
}
