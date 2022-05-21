using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;
using UnityEngine.UI;
using UnityEngine.SceneManagement;


public class NetworkManager : MonoBehaviourPunCallbacks
{
    public Text StatusText;
    public InputField roomInput, NickNameInput;


    void Awake() => Screen.SetResolution(1920, 1080, false);

    public void Update()
    {
        if (PhotonNetwork.InRoom){

        }
        else
        {
        StatusText.text = PhotonNetwork.NetworkClientState.ToString();
        }
    }


    public void Connect() => PhotonNetwork.ConnectUsingSettings();

    public override void OnConnectedToMaster()
    {
        print("서버접속완료");
        PhotonNetwork.LocalPlayer.NickName = NickNameInput.text;
        print(PhotonNetwork.LocalPlayer.NickName+ "님 어서오세요!");
    }


    // 서버 연결 끊기
    public void Disconnect()
    { 
        PhotonNetwork.Disconnect();
    }
    public override void OnDisconnected(DisconnectCause cause)
    {
        print("연결끊김");
    }

    // 로비 참가
    public void JoinLobby()
    {
        PhotonNetwork.JoinLobby();
    }

    public override void OnJoinedLobby()
    {
        print("로비접속완료");
    }

    // 방만들기
    public void CreateRoom()
    {
        PhotonNetwork.CreateRoom(roomInput.text, new RoomOptions { MaxPlayers = 2 });
    }

    public override void OnCreatedRoom()
    {
        print("방만들기완료");
    }

    public override void OnCreateRoomFailed(short returnCode, string message)
    {
        print("방만들기실패");
    }

    // 방참가
    public void JoinRoom()
    {
        PhotonNetwork.JoinRoom(roomInput.text);
    }

    public override void OnJoinedRoom()
    {
        print("방참가완료");
        PhotonNetwork.LoadLevel("game");
        
    }

    public override void OnJoinRoomFailed(short returnCode, string message)
    {
        print("방참가실패");
    }

    // 방있으면 참가 없으면 생성
    public void JoinOrCreateRoom()
    {
        PhotonNetwork.JoinOrCreateRoom(roomInput.text, new RoomOptions { MaxPlayers = 2 }, null);
    }

    // 랜덤방 참가

    public void JoinRandomRoom()
    {
        PhotonNetwork.JoinRandomRoom();
    }

    public override void OnJoinRandomFailed(short returnCode, string message)
    {
        print("방랜덤참가실패");
    }

    // 방 나가기
    public void LeaveRoom()
    {
        PhotonNetwork.LeaveRoom();
    }
    


    [ContextMenu("정보")]
    void Info()
    {
        if (PhotonNetwork.InRoom)
        {


            string playerStr = "방에 있는 플레이어 목록 : ";
            for (int i = 0; i < PhotonNetwork.PlayerList.Length; i++) playerStr += PhotonNetwork.PlayerList[i].NickName + ", ";

        }
    }
}