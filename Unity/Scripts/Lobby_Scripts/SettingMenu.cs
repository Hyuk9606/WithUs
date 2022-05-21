using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Audio;
using System.Runtime.InteropServices;

public class SettingMenu : MonoBehaviour
{
    public GameObject Manual;


    [DllImport("__Internal")]
    private static extern void audioChange();

    public GameObject MapMain;
    public GameObject MinimapIconOn;

    public GameObject Micro;
    private GameObject MicroOn;
    private GameObject MicroOff;

    private CanvasGroup canvasGroup;

    // 버튼 부분
    public void OnClickExit(){
#if UNITY_EDITOR
            UnityEditor.EditorApplication.isPlaying = false;
#else
        Application.Quit();
#endif
        }

    public void OnClickMap()
    {
        if (MapMain.activeSelf)
        {
            MapMain.SetActive(false);
            MinimapIconOn.SetActive(true);
        }
        else
        {
            MapMain.SetActive(true);
            MinimapIconOn.SetActive(false);
        }
    }
    // Start is called before the first frame update
    void Start()
    {
        canvasGroup = GetComponent<CanvasGroup>();

        Manual.SetActive(false);
        
        MapMain.SetActive(false);
        MinimapIconOn.SetActive(true);

        // 마이크
        Micro = GameObject.FindGameObjectWithTag("Micro");
        MicroOn = Micro.transform.GetChild(0).gameObject;
        MicroOff = Micro.transform.GetChild(1).gameObject;
        MicroOn.SetActive(false);
        MicroOff.SetActive(true);
    }

    void MicroFail()
    {
        MicroOn.SetActive(false);
        MicroOff.SetActive(true);
    }

    void Update()
    {
        if (Input.GetKeyUp(KeyCode.T))
        {
            if(MicroOn.activeSelf)
            {
                MicroOn.SetActive(false);
                MicroOff.SetActive(true);
            } else {
                MicroOn.SetActive(true);
                MicroOff.SetActive(false);
            }
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    audioChange ();
#endif
        }
        // esc Option부분
        if (Input.GetButtonDown("Cancel"))
        {
            
            
            if(Manual.activeSelf)
            {
                Manual.SetActive(false);
            }
            else{
                Manual.SetActive(true);
            }
        }

        if(Input.GetButtonDown("Minimap"))
        {
            
            
            if(MapMain.activeSelf)
            {
                MapMain.SetActive(false);
                MinimapIconOn.SetActive(true);
            }
            else{
                MapMain.SetActive(true);
                MinimapIconOn.SetActive(false);
            }
        }
        // print("확인하기"+canvasGroup.alpha);
        if(Input.GetKeyDown(KeyCode.R))
        {
            if(canvasGroup.alpha == 1)
            {
                canvasGroup.alpha = 0;

                //마우스커서 없애기 및 고정
                Cursor.visible = false;
                Cursor.lockState = CursorLockMode.Locked;
            }
            else if(canvasGroup.alpha == 0)
            {
                canvasGroup.alpha =1;
                Cursor.visible = true;
                Cursor.lockState = CursorLockMode.Confined;
            }
            
        }

        
        
    }
}
