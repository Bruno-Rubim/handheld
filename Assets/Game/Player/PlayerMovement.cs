using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour 
{
    public ControllerManager controller;

    public float movementSpeed = 5f;
    public Transform movePoint;
    public float movementDistance = 1f;
    public float minimumDistance = 0.1f;

    public LayerMask collisionLayer;

    // Start is called before the first frame update
    void Start()
    {
        movePoint.parent = null;
    }

    void changeMovePoint(){
        if (Vector3.Distance(transform.position, movePoint.position) <= minimumDistance){
            if(controller.dpadRightPressed){
                if(!Physics2D.OverlapCircle(movePoint.position + new Vector3(movementDistance, 0, 0), .2f, collisionLayer)){
                    movePoint.position += new Vector3(movementDistance, 0, 0);
                }
            } else if(controller.dpadLeftPressed){
                if(!Physics2D.OverlapCircle(movePoint.position - new Vector3(movementDistance, 0, 0), .2f, collisionLayer)){
                    movePoint.position -= new Vector3(movementDistance, 0, 0);
                }
            } else if(controller.dpadUpPressed){
                if(!Physics2D.OverlapCircle(movePoint.position + new Vector3(0, movementDistance, 0), .2f, collisionLayer)){
                    movePoint.position += new Vector3(0, movementDistance, 0);
                }
            } else if(controller.dpadDownPressed){
                if(!Physics2D.OverlapCircle(movePoint.position - new Vector3(0, movementDistance, 0), .2f, collisionLayer)){
                    movePoint.position -= new Vector3(0, movementDistance, 0);
                }
            }
        }
    }

    void movePlayer(){
        transform.position = Vector3.MoveTowards(transform.position, movePoint.position, movementSpeed * Time.deltaTime);
    }

    // Update is called once per frame
    void Update()
    {
        changeMovePoint();
        movePlayer();
    }
}
