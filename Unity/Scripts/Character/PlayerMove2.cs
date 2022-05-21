using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;
using Cinemachine;
using UnityEngine.SceneManagement;

public class PlayerMove2 : MonoBehaviour
{
  private ChatTest chatTest;

  public float speed = 6.0F;
  public float jumpSpeed = 5.0F;

  public float gravity = 10.0F;
  public Vector3 moveDirection = Vector3.zero;

  private bool collided = false;

  private Animator animator;

  private CharacterController controller;

  private PhotonView pv;
  private CinemachineVirtualCamera virtualCamera;


  private void Start()
  {
    controller = GetComponent<CharacterController>();
    animator = GetComponent<Animator>();
    pv = GetComponent<PhotonView>();
    chatTest = GameObject.Find("ChatController").GetComponent<ChatTest>();
    // Camera.main.GetComponent<SmoothFollow>().target = transform.Find("CamPosition").transform;
    if (SceneManager.GetActiveScene().name != "DemoScene" && pv.IsMine)
    {
      Camera.main.GetComponent<SmoothFollow>().target = transform.Find("CamPosition").transform;
      // tag: CamPosTag
      // Camera.main.GetComponent<SmoothFollow>().target = GameObject.FindGameObjectWithTag("CamPosTag").transform;
    }
    // pv = GetComponent<PhotonView>(); 
    // virtualCamera = GameObject.FindObjectOfType<CinemachineVirtualCamera>();

    // print(pv.IsMine);
    // if (SceneManager.GetActiveScene().name != "DemoScene" && pv.IsMine)
    // {
    //     virtualCamera.Follow = transform;
    //     virtualCamera.LookAt = transform;
    // }
  }

  // Update is called once per frame
  void Update()
  {
    // print("pvismine" + pv.IsMine);
    // if (transform.position.y <= -15.0f)
    // {
    // 	CharacterController cc = GetComponent<CharacterController>();
    // 	cc.enabled = false;
    // 	transform.position = new Vector3(26.0f, 0.2f, -36.0f);
    // }
    // print("Scenemanager" + SceneManager.GetActiveScene().name);
    // if (pv.IsMine)
    if (SceneManager.GetActiveScene().name != "DemoScene" && pv.IsMine)
    {
      if (collided)
      {
        controller.enabled = false;
        collided = false;
      }
      else
      {

        controller.enabled = true;


        //추가한 부분(조건문)
        if (controller.isGrounded && animator.GetBool("toSit") == false && chatTest.mainInputField.isFocused == false)
        {
          float h = Input.GetAxis("Horizontal");
          float v = Input.GetAxis("Vertical");

          moveDirection = new Vector3(h, 0, v);
          moveDirection = moveDirection.normalized;
          // moveDirection = transform.TransformDirection(moveDirection);
          moveDirection = Camera.main.transform.TransformDirection(moveDirection);
          moveDirection *= speed;
          if (Input.GetButton("Jump"))
          {
            moveDirection.y = jumpSpeed;
            animator.SetTrigger("Jumpping");
          }
        }


        moveDirection.y -= gravity * Time.deltaTime;
        controller.Move(moveDirection * Time.deltaTime);

        // transform.Rotate(0, Input.GetAxis("Horizontal"), 0);
      }
    }

  }

  private void OnTriggerEnter(Collider other)
  {
    if(pv.IsMine)
    {
      collided = true;
    }
  }

}
