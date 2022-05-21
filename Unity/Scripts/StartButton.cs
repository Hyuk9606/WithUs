using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.SceneManagement;
using System.Runtime.InteropServices;
using Photon.Pun;
using Photon.Realtime;
// using AdvancedPeopleSystem;
#if UNITY_EDITOR
    using UnityEditor;
#endif

public class StartButton : MonoBehaviour
{
  private GameObject obj;
  [DllImport("__Internal")]
  private static extern void ClickStartbtn();
  [DllImport("__Internal")]
  private static extern void GetAvatar(string userId);

  [DllImport("__Internal")]
  private static extern void SaveAvatar(string settings);
  public string userName;
  public string userId;

  private AdvancedPeopleSystem.CharacterCustomization pcc;


  public Dictionary<string, string> userAvatars = new Dictionary<string, string>();
  public Dictionary<string, string> IsMale = new Dictionary<string, string>();
  public void ReceiveAvatar(string data)
  {
    // Debug.Log("이거이거 여기야 여기");
    // Debug.Log(data);
    if(data == "null") return;

    int splitIdx = data.IndexOf("&");
    string user = data.Substring(0, splitIdx);
    string setting = data.Substring(splitIdx + 1);
    if(userAvatars.ContainsKey(user)) userAvatars.Remove(user);

    userAvatars.Add(user, setting);

    splitIdx = setting.IndexOf(":");
    string settingsName = setting.Substring(splitIdx, 20);

    if(SceneManager.GetActiveScene().name == "DemoScene" && settingsName.Contains("FemaleSettings"))
    {
      GameObject.Find("MaleUI").GetComponent<UIControllerDEMO>().SwitchCharacterSettings("Female");
    }

  }

  public void test()
  {
    pcc.SaveCharacterToFile(AdvancedPeopleSystem.CharacterCustomizationSetup.CharacterFileSaveFormat.Json, "", userId);
    if(IsMale.ContainsKey(userId)) IsMale.Remove(userId);
    IsMale.Add(userId, pcc.Settings.name);
    Debug.Log("Start !!!! : " + userId + " -- " + pcc.Settings.name);
    SceneManager.LoadScene("Lobby");
  }

  public void GetUser(string username)
  {
    userName = username;
  }
  public void GetUserId(string userid)
  {
    userId = userid;
  }


  void Awake()
  {
    userId = "test";
    userName = "testName";
    pcc = GameObject.Find("Player").GetComponent<AdvancedPeopleSystem.CharacterCustomization>();
    ClickStartbtn();
    DontDestroyOnLoad(this.gameObject);
  }


  public void CallClickStartBtn()
  {
    ClickStartbtn();
  }

  public void CallGetAvatar(string userId)
  {
    GetAvatar(userId);
  }

  public void CallSaveAvatar(string settings)
  {
    SaveAvatar(settings);
  }
}