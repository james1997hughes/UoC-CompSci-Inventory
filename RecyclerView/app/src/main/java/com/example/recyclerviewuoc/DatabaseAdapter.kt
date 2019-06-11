package com.example.recyclerviewuoc

import android.support.v7.widget.RecyclerView
import android.view.View
import android.view.ViewGroup

class DatabaseAdapter : RecyclerView.Adapter<DatabaseAdapter.DatabaseViewHolder>(){
    override fun onCreateViewHolder(p0: ViewGroup, p1: Int): DatabaseViewHolder {}

    override fun getItemCount(): Int {
        return 0
    }

    override fun onBindViewHolder(viewHolder : DatabaseViewHolder, position : Int) {}

    inner class DatabaseViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView){
    }
}