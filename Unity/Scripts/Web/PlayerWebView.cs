using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using UnityEngine.SceneManagement;
public class PlayerWebView : MonoBehaviour
{
    private GameObject tetris, board1, board2, board3, solitaire, donkingkong;

    private PhotonView pv;
    private string objname;

    private RaycastHit hit;

    private void Awake() {
        pv = GetComponent<PhotonView>();
        
    }

    private void Start() {

        if (SceneManager.GetActiveScene().name != "DemoScene" && pv.IsMine)
        {
            tetris = GameObject.Find("Webs").transform.Find("tetris").gameObject;
            board1 = GameObject.Find("Webs").transform.Find("board1").gameObject;
            board2 = GameObject.Find("Webs").transform.Find("board2").gameObject;
            board3 = GameObject.Find("Webs").transform.Find("board3").gameObject;
            solitaire = GameObject.Find("Webs").transform.Find("solitaire").gameObject;
            donkingkong = GameObject.Find("Webs").transform.Find("donkingkong").gameObject;
        }     
    }
    

    private void Update()
    {           
        if(SceneManager.GetActiveScene().name != "DemoScene" && pv.IsMine)
        {

            if(Physics.Raycast(Camera.main.transform.position, Camera.main.transform.forward, out hit, 5))
            {
                objname = hit.collider.name;
                if(objname=="tetris" && Input.GetKeyDown(KeyCode.E))
                {
                    if(tetris.activeSelf==false)
                    {
                        tetris.SetActive(true);
                    }
                    objname = "";
                }

                else if(objname=="board1" && Input.GetKeyDown(KeyCode.E))
                {
                    if(board1.activeSelf==false)
                    {
                        board1.SetActive(true);
                    }
                    objname = "";
                }

                else if(objname=="board2" && Input.GetKeyDown(KeyCode.E))
                {
                    if(board2.activeSelf==false)
                    {
                        board2.SetActive(true);
                    }
                    objname = "";
                }

                else if(objname=="board3" && Input.GetKeyDown(KeyCode.E))
                {
                    if(board3.activeSelf==false)
                    {
                        board3.SetActive(true);
                    }
                    objname = "";
                }

                else if(objname=="solitaire" && Input.GetKeyDown(KeyCode.E))
                {
                    if(solitaire.activeSelf==false)
                    {
                        solitaire.SetActive(true);
                    }
                    objname = "";
                }

                else if(objname=="donkingkong" && Input.GetKeyDown(KeyCode.E))
                {
                    if(donkingkong.activeSelf==false)
                    {
                        donkingkong.SetActive(true);
                    }
                    objname = "";
                }
            }

            if(donkingkong.activeSelf || solitaire.activeSelf || board1.activeSelf || board2.activeSelf|| board3.activeSelf || tetris.activeSelf)
                {
                    if(Input.GetKeyDown(KeyCode.Q))
                    {
                        donkingkong.SetActive(false);
                        solitaire.SetActive(false);
                        board1.SetActive(false);
                        board2.SetActive(false);
                        board3.SetActive(false);
                        tetris.SetActive(false); 
                    }
                }
        }
    }
    
}
