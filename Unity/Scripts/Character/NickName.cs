// using System.Collections;
// using System.Collections.Generic;
// using UnityEngine;
// using Photon.Pun;
// using Photon.Realtime;
// using UnityEngine.SceneManagement;

// public class NickName : MonoBehaviourPunCallbacks, IPunObservable
// {
//   public PhotonView pv;
//   public TMPro.TextMeshPro Text;
//   private string userId = "sung";

//   private void Awake()
//   {
//         if (SceneManager.GetActiveScene().name == "Lobby")
//         {
//             pv = GetComponent<PhotonView>();
//             Text.text = pv.IsMine ? PhotonNetwork.AddNick : pv.Owner.AddNick;
//             // Text.color = pv.IsMine ? Color.green : Color.red;
//         }
 


//     }
//   public void OnPhotonSerializeView(PhotonStream stream, PhotonMessageInfo info)
//   {

//   }

// }

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;
using UnityEngine.SceneManagement;
using TMPro;

public class NickName : MonoBehaviourPunCallbacks
{   
    public PhotonView pv;
    // public TMPro.TextMeshPro Text;
    public TMP_Text Text;

    private string userName;
    private StartButton sb;
    private GameObject obj;

    private void Awake() 
    {   
        if (SceneManager.GetActiveScene().name == "Lobby")
        {
            obj = GameObject.Find("GameObject");
            sb = obj.GetComponent<StartButton>();
            userName = sb.userName;

            pv = GetComponent<PhotonView>();
            
            if (pv.IsMine)
            {
                pv.RPC("AddNick", RpcTarget.AllBuffered, userName);
            }
        }

    }

    [PunRPC]
    void AddNick(string userName)
    {
        Text.text = userName;
    }

}

