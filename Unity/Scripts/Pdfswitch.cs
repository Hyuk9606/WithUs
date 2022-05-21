using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using System.Runtime.InteropServices;



public class Pdfswitch : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void uploadPDF(string className);
    
    private PhotonView pv;

    private GameObject pdfObject;
    // private bool check=false;

    private string objname;

    private void Start() {
        
        pv = GetComponent<PhotonView>();
        
    }
    
    [SerializeField]
    private bool triggerActive = false;



    public void OnTriggerEnter(Collider other)
    {
        
        if(pv.IsMine)
        {
            if(other.name == "class1" || other.name == "class2" || other.name == "class3")
            {
                triggerActive = true;
                objname = other.name;
            }
        }
        
    }

    public void OnTriggerExit(Collider other)
    {
        if(pv.IsMine)
        {
            if(other.name == "class1" || other.name == "class2" || other.name == "class3")
            {
                triggerActive = false;
            }
        }
    }

    private void Update()
    {
         
        // print("확인용"+this.gameObject);
        if (triggerActive && Input.GetKeyDown(KeyCode.E))
        {
            if(objname== "class1")
            {
                // print("이름확인"+objname);
#if UNITY_WEBGL == true && UNITY_EDITOR == false
                uploadPDF(objname);
#endif
            }
            if (objname == "class2")
            {
                // print("이름확인" + objname);
#if UNITY_WEBGL == true && UNITY_EDITOR == false
                uploadPDF(objname);
#endif
            }
            if (objname == "class3")
            {
                // print("이름확인" + objname);
#if UNITY_WEBGL == true && UNITY_EDITOR == false
                uploadPDF(objname);
#endif
            }
        }
        
    }
    
}
