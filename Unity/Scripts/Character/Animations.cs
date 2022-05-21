using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using Photon.Pun;
public class Animations : MonoBehaviour
{
    private PlayerMove2 playerMove2;

    private Animator animator;

    private PhotonView pv;

    private CharacterController controller;
    // Start is called before the first frame update

    private void Awake() {
        playerMove2 = GetComponent<PlayerMove2>();
        animator = GetComponent<Animator>();
        controller = GetComponent<CharacterController>();
        pv = GetComponent<PhotonView>();
    }

    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (SceneManager.GetActiveScene().name != "DemoScene" && pv.IsMine)
        {

            if(playerMove2.moveDirection.x!=0.0 || playerMove2.moveDirection.z!=0.0)
                {
                        animator.SetBool("isMoving", true);	
                }
            else
                {
                    animator.SetBool("isMoving", false);
                }

            if(playerMove2.moveDirection.x==0.0 && playerMove2.moveDirection.z==0.0 && Input.GetKeyDown(KeyCode.X))
                {
                    
                    if(animator.GetBool("toSit")==false)
                    {
                        animator.SetBool("toSit", true); 
                    }
                    else
                    {
                        animator.SetBool("toSit", false);
                    }
                
                }

        }
        
    }
}
