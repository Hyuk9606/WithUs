using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MouseButtonDown : MonoBehaviour
{

    // Update is called once per frame
    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            print("클릭됐습니다.");
        }
    }
}
