using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;
using System.Runtime.InteropServices;

public class portalTransform : MonoBehaviour
{
    public Transform spawnPoint;
    public GameObject Player;

    public GameObject Micro;
    private GameObject MicroOn;
    private GameObject MicroOff;

    private PhotonView pv;
    // GameObject Player;
    [DllImport("__Internal")]
    private static extern void portal(string session);

    private void Awake()
    {

        Micro = GameObject.FindGameObjectWithTag("Micro");
        MicroOn = Micro.transform.GetChild(0).gameObject;
        MicroOff = Micro.transform.GetChild(1).gameObject;

    }
    // 2�� -960 ~ -940
    // 1�� -15 ~ 5
    // ���ǽ� 1  980~1000
    // ���ǽ� 2 880 ~900
    // ���ǽ� 3  1030 ~ 1060
    private void OnTriggerEnter(Collider other)
    {
        // print("test �浹 : " + other.gameObject.transform.position.y);
        // print("test spawnpoint: " + spawnPoint.position.y);
        pv = other.GetComponent<PhotonView>();

        other.gameObject.transform.position = spawnPoint.position;
        if (pv.IsMine)
        {

            MicroOn.SetActive(false);
            MicroOff.SetActive(true);


            if (-980 <= spawnPoint.position.y && spawnPoint.position.y <= -940)
            {
                // floor 2
                #if UNITY_WEBGL == true && UNITY_EDITOR == false
                    portal ("lobby2");
                #endif
            }
            else if (-15 <= spawnPoint.position.y && spawnPoint.position.y <= 5)
            { // floor 1
                #if UNITY_WEBGL == true && UNITY_EDITOR == false
                    portal ("lobby");
                #endif
            }
            else if (980 <= spawnPoint.position.y && spawnPoint.position.y <= 1000)
            { // class 1
                #if UNITY_WEBGL == true && UNITY_EDITOR == false
                    portal ("class1");
                #endif
            }
            else if (880 <= spawnPoint.position.y && spawnPoint.position.y <= 900)
            { // class 2
                #if UNITY_WEBGL == true && UNITY_EDITOR == false
                    portal ("class2");
                #endif
            }
            else if (1030 <= spawnPoint.position.y && spawnPoint.position.y <= 1060)
            { // class 3
                #if UNITY_WEBGL == true && UNITY_EDITOR == false
                    portal ("class3");
                #endif
            }
            else if (1520 <= spawnPoint.position.y && spawnPoint.position.y <= 1560)
            { // MeetingMap
                // MeetingRoom 1
                if (40 <= spawnPoint.position.x && spawnPoint.position.x <= 55)
                {
                    #if UNITY_WEBGL == true && UNITY_EDITOR == false
                        portal ("meeting1");
                    #endif
                }
                else {
                    // MeetingRoom 2
                    if (140 <= spawnPoint.position.z && spawnPoint.position.z <= 160)
                    {
                        #if UNITY_WEBGL == true && UNITY_EDITOR == false
                            portal ("meeting2");
                        #endif
                    }
                    // MeetingRoom 3
                    else if (30 <= spawnPoint.position.z && spawnPoint.position.z <= 46)
                    {
                        #if UNITY_WEBGL == true && UNITY_EDITOR == false
                            portal ("meeting3");
                        #endif
                    }
                }
            }

        }
    // Vector3 inta = spawnPoint.rotation.eulerAngles;
    // inta = inta + new Vector3(0,180,0);
    // Quaternion rot = Quaternion.Euler(inta);
    // other.gameObject.transform.rotation = rot;

    }
}