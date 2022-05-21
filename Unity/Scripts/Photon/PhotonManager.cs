using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;
using Random = UnityEngine.Random;
using System.Runtime.InteropServices;

public class PhotonManager : MonoBehaviourPunCallbacks
{
  // 버전 입력
  private readonly string version = "1.0f";

  private TypedLobby customLobby = new TypedLobby("customLobby", LobbyType.Default);

  // 사용자 아이디 입력
  private string userId;
  private string userName;
  private StartButton sb;
  [DllImport("__Internal")]
  private static extern void loadingGame(string session);

  private GameObject obj;
  private GameObject Player;
  private string[] group = {"101463011975363054342", "2208307161", "2238003549", "2201016114" };
  // Start()보다 먼저 실행됨 -> Play를 누르자 마자 동작
  void Awake()
  {

        obj = GameObject.Find("GameObject");
        sb = obj.GetComponent<StartButton>();
        userId = sb.userId;
        userName = sb.userName;

        // 같은 룸의 유저들에게 자동으로 씬을 로딩
        PhotonNetwork.AutomaticallySyncScene = true;

        // 같은 버전의 유저끼리 접속 허용
        PhotonNetwork.GameVersion = version;

        // 유저 아이디 할당
        PhotonNetwork.NickName = userId;
    

        // 포톤 서버와 통신 횟수 출력. 초당 30 (default)
        // Debug.Log(PhotonNetwork.SendRate);

        // 서버 접속
        PhotonNetwork.ConnectUsingSettings();
  }

  // 포톤 서버에 접속 후 호출되는 콜백 함수
  public override void OnConnectedToMaster()
  {
    // Debug.Log("Connected to Master!");
    // Debug.Log($"PhotonNetwork.InLobby = {PhotonNetwork.InLobby}");  // false

    // 로비 입장
    PhotonNetwork.JoinLobby(customLobby);
  }

  // 로비 접속 후 호출되는 콜백 함수
  public override void OnJoinedLobby()
  {
    // Debug.Log($"PhotonNetwork.InLobby = {PhotonNetwork.InLobby}"); // true

    // 랜덤 매칭
    PhotonNetwork.JoinOrCreateRoom("withus", new RoomOptions { MaxPlayers = 20, IsOpen = true, IsVisible = false }, null);
  }

  // 랜덤한 룸 입장이 실패했을 경우 호출되는 콜백 함수
  // public override void OnJoinRandomFailed(short returnCode, string message)
  // {
  //   Debug.Log($"JoinRandom Failed {returnCode}:{message}");

  //   // 룸의 속성 정의
  //   RoomOptions ro = new RoomOptions();
  //   ro.MaxPlayers = 20;      // 최대 접속자 수
  //   ro.IsOpen = true;       // 룸의 오픈 여부
  //   ro.IsVisible = true;    // 로비에서 룸 목록에 노출 시킬지 여부

  //   PhotonNetwork.CreateRoom("My Room", ro);    // Params : 방 이름 , 속성
  // }

  // 룸 생성이 완료된 후 호출되는 콜백 함수
  public override void OnCreatedRoom()
  {
    // Debug.Log("Created Room");
    // Debug.Log($"Room Name = {PhotonNetwork.CurrentRoom.Name}");
  }

  // 룸에 입장한 후 호출되는 콜백 함수
  public override void OnJoinedRoom()
  {
    // Debug.Log($"PhotonNetwork.InRoom = {PhotonNetwork.InRoom}");
    // Debug.Log($"Player Count = {PhotonNetwork.CurrentRoom.PlayerCount}");

    // 룸에 접속한 사용자 정보 확인
    // foreach (var player in PhotonNetwork.CurrentRoom.Players)
    // {
    //   // Debug.Log($"{player.Value.NickName}, {player.Value.ActorNumber}");
    // }

    // 캐릭터 출현 정보를 배열에 저장
        Transform[] points = GameObject.Find("SpawnPointGroup").GetComponentsInChildren<Transform>();
        int idx = Random.Range(1, points.Length);

        Transform p = null;
        for (int i = 0; i <= 2; i++){
          if(group[i] == userId){
            if(i >= 2){
              p = GameObject.Find("EunSung").GetComponent<Transform>();
            }
            else{
              p = GameObject.Find("JaeHyun").GetComponent<Transform>();
            }
          }
        }

        if(p == null){
          p = points[idx];
        }

        if (sb.IsMale[userId] == "MaleSettings")
        {
          PhotonNetwork.Instantiate("Player", p.position, p.rotation, 0);
        }
        else
        {
          PhotonNetwork.Instantiate("Player 1", p.position, p.rotation, 0);
        }

        Debug.Log(sb.IsMale[userId]);

    // 캐릭터 생성



#if UNITY_WEBGL == true && UNITY_EDITOR == false
    loadingGame ("lobby");
#endif
  }
}
